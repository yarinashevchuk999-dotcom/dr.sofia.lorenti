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
  delay: number;
  duration: number;
  liftPx: number;
  /** eyebrow/desc/CTA settle from slightly below; the title uses a bigger
   * lift + its own overflow-hidden wrapper so it reads as emerging from
   * behind the hero rather than a plain fade */
  scale?: boolean;
};

/**
 * Cinematic entrance for the Hero — eyebrow → title → description → CTA
 * stagger in (opacity + translateY, easeOutCubic, no bounce/overshoot) once
 * on mount, plus a slow continuous scroll-driven video zoom (scale 1 →
 * ~1.07) + a whisper of parallax drift on a dedicated wrapper around the
 * <video> so it never fights the video's own load-in CSS animation.
 *
 * The staggered entrance is time-based (plays once, right away), NOT tied
 * to scroll position: the hero is the first thing on the page, so scroll
 * progress starts at 0 on load, and an earlier scroll-linked version of
 * this left the title stuck hidden/clipped behind its overflow-hidden mask
 * until the visitor scrolled — invisible on first paint on mobile. The
 * video zoom is still scroll-linked (that part was never the problem).
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
      { ref: eyebrowRef, delay: 80, duration: 700, liftPx: 20 },
      { ref: titleRef, delay: 160, duration: 900, liftPx: 56 },
      { ref: descRef, delay: 320, duration: 700, liftPx: 15 },
      { ref: ctaRef, delay: 420, duration: 700, liftPx: 15, scale: true },
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
    };

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let entranceRaf = 0;
    let safetyTimer = 0;
    if (reduce) {
      applyFinal();
    } else {
      for (const stage of stages) {
        const el = stage.ref.current;
        if (!el) continue;
        el.style.opacity = "0";
        el.style.transform = stage.scale
          ? `translateY(${stage.liftPx}px) scale(0.98)`
          : `translateY(${stage.liftPx}px)`;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = now - start;
        let allDone = true;
        for (const stage of stages) {
          const el = stage.ref.current;
          if (!el) continue;
          const local = clamp01((t - stage.delay) / stage.duration);
          if (local < 1) allDone = false;
          const ease = easeOutCubic(local);
          const lift = (1 - ease) * stage.liftPx;
          el.style.transform = stage.scale
            ? `translateY(${lift.toFixed(1)}px) scale(${(0.98 + ease * 0.02).toFixed(3)})`
            : `translateY(${lift.toFixed(1)}px)`;
          el.style.opacity = ease.toFixed(3);
        }
        if (!allDone) entranceRaf = requestAnimationFrame(tick);
      };
      entranceRaf = requestAnimationFrame(tick);
      // belt-and-braces: never leave the hero stuck invisible (e.g. a
      // backgrounded/throttled tab pausing rAF mid-entrance)
      safetyTimer = window.setTimeout(applyFinal, 2200);
    }

    // scroll-driven video zoom — separate from the entrance above, keeps
    // running for as long as the hero track is on screen
    let frame = 0;
    const updateVideo = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = clamp01(-rect.top / scrollable);
      const vEl = videoWrapRef.current;
      if (vEl) {
        const scale = 1 + progress * 0.07; // 1 → 1.07
        const drift = -progress * 10; // px — gentle, opposite-feeling speed to the content
        vEl.style.transform = `translateY(${drift.toFixed(1)}px) scale(${scale.toFixed(4)})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateVideo);
    };
    updateVideo();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      if (entranceRaf) cancelAnimationFrame(entranceRaf);
      if (safetyTimer) window.clearTimeout(safetyTimer);
    };
  }, [trackRef, videoWrapRef, eyebrowRef, titleRef, descRef, ctaRef]);
}
