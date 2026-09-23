"use client";

import { useEffect, type RefObject } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

type Stage = {
  ref: RefObject<HTMLElement | null>;
  start: number;
  end: number;
  liftPx: number;
  /** eyebrow/desc/CTA settle from slightly below; the title uses a bigger
   * lift + its own overflow-hidden wrapper so it reads as emerging from
   * behind the hero rather than a plain fade */
  scale?: boolean;
};

/**
 * Cinematic scroll-driven reveal for the Hero, sharing one progress value
 * (0 = pin starts, 1 = pin releases) across:
 *  - a staggered enter for eyebrow → title → description → CTA (opacity +
 *    translateY, easeOutCubic, no bounce/overshoot) as the visitor scrolls
 *  - a slow continuous video zoom (scale 1 → ~1.07) + a whisper of parallax
 *    drift, applied to a dedicated wrapper around the <video> so it never
 *    fights the video's own load-in CSS animation
 *
 * The title's liftPx (56) must stay ≤ the spare room the mask wrapper around
 * the <h1> reserves (see the pb-14/-mb-14 on that div in page.tsx) — otherwise
 * the second line clips during the animation instead of sliding in clean.
 */
export function useHeroCinematicReveal(
  trackRef: RefObject<HTMLElement | null>,
  videoWrapRef: RefObject<HTMLElement | null>,
  eyebrowRef: RefObject<HTMLElement | null>,
  titleRef: RefObject<HTMLElement | null>,
  descRef: RefObject<HTMLElement | null>,
  ctaRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const stages: Stage[] = [
      { ref: eyebrowRef, start: 0, end: 0.12, liftPx: 20 },
      { ref: titleRef, start: 0.04, end: 0.24, liftPx: 56 },
      { ref: descRef, start: 0.16, end: 0.32, liftPx: 15 },
      { ref: ctaRef, start: 0.26, end: 0.42, liftPx: 15, scale: true },
    ];

    const applyFinal = () => {
      for (const stage of stages) {
        const el = stage.ref.current;
        if (!el) continue;
        el.style.opacity = "1";
        el.style.transform = stage.scale
          ? "translateY(0px) scale(1)"
          : "translateY(0px)";
      }
      const vEl = videoWrapRef.current;
      if (vEl) vEl.style.transform = "translateY(0px) scale(1)";
    };

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      // no motion, but content must never be left stuck hidden
      applyFinal();
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = clamp01(-rect.top / scrollable);

      for (const stage of stages) {
        const el = stage.ref.current;
        if (!el) continue;
        const local = clamp01(
          (progress - stage.start) / (stage.end - stage.start),
        );
        const ease = easeOutCubic(local);
        const lift = (1 - ease) * stage.liftPx;
        el.style.transform = stage.scale
          ? `translateY(${lift.toFixed(1)}px) scale(${(0.98 + ease * 0.02).toFixed(3)})`
          : `translateY(${lift.toFixed(1)}px)`;
        el.style.opacity = ease.toFixed(3);
      }

      // video: slow continuous Ken-Burns zoom + subtle parallax drift,
      // across the whole pin — independent, slower rhythm than the content
      const vEl = videoWrapRef.current;
      if (vEl) {
        const scale = 1 + progress * 0.07; // 1 → 1.07
        const drift = -progress * 10; // px — gentle, opposite-feeling speed to the content
        vEl.style.transform = `translateY(${drift.toFixed(1)}px) scale(${scale.toFixed(4)})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [trackRef, videoWrapRef, eyebrowRef, titleRef, descRef, ctaRef]);
}
