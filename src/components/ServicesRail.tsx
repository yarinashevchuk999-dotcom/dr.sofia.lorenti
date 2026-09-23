"use client";

import { useEffect, useRef } from "react";

type Item = { group: string; items: string; image: string };

/**
 * Horizontal rail of service tiles. Panning is driven purely by where the
 * pointer sits over the rail — hover the left side to glide toward the start,
 * the right side toward the end, the centre to rest. Touch devices use native
 * swipe. A one-time nudge on first view signals that it moves.
 */
export default function ServicesRail({ items }: { items: Item[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScroll = () => rail.scrollWidth - rail.clientWidth;

    // one-time "it moves" nudge when the rail first enters view
    let nudged = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || nudged) return;
          nudged = true;
          const start = performance.now();
          const dur = 1100;
          const dist = Math.min(170, maxScroll());
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            rail.scrollLeft = Math.sin(p * Math.PI) * dist;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(rail);

    // pointer-driven pan (desktop only)
    let raf = 0;
    let target = rail.scrollLeft;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const ease = () => {
      const diff = target - rail.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        rail.scrollLeft = target;
        raf = 0;
        return;
      }
      rail.scrollLeft += diff * 0.2;
      raf = requestAnimationFrame(ease);
    };

    const onMove = (e: PointerEvent) => {
      const rect = rail.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const dead = 0.12;
      const max = maxScroll();
      if (x < 0.5 - dead) {
        const strength = (0.5 - dead - x) / (0.5 - dead);
        target = rail.scrollLeft - max * strength - rect.width;
      } else if (x > 0.5 + dead) {
        const strength = (x - 0.5 - dead) / (0.5 - dead);
        target = rail.scrollLeft + max * strength + rect.width;
      } else {
        target = rail.scrollLeft;
      }
      target = Math.max(0, Math.min(max, target));
      if (!raf) raf = requestAnimationFrame(ease);
    };
    const rest = () => {
      target = rail.scrollLeft;
    };

    if (!isCoarse) {
      rail.addEventListener("pointermove", onMove);
      rail.addEventListener("pointerleave", rest);
      rail.addEventListener("pointercancel", rest);
    }

    return () => {
      io.disconnect();
      rail.removeEventListener("pointermove", onMove);
      rail.removeEventListener("pointerleave", rest);
      rail.removeEventListener("pointercancel", rest);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={railRef}
      className="no-scrollbar flex gap-4 overflow-x-auto px-4 sm:gap-6 md:px-8"
    >
      {items.map((s, i) => (
        <a
          key={s.group}
          href="#contact"
          className="group relative aspect-[4/5] w-[64vw] max-w-[320px] shrink-0 overflow-hidden bg-ink sm:w-[40vw] md:w-[26vw] lg:w-[23vw]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt={s.group}
            className="absolute inset-0 h-full w-full object-cover brightness-[1.12] contrast-[1.14] saturate-[1.25] transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          {/* warm tint to keep the tiles in-palette */}
          <span className="absolute inset-0 bg-[#b98a52] opacity-25 mix-blend-soft-light" />
          {/* light legibility wash + bottom fade behind the label */}
          <span className="absolute inset-0 bg-ink/12 transition-colors duration-500 group-hover:bg-ink/[0.04]" />
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-[color:var(--milk)] [text-shadow:0_1px_6px_rgba(0,0,0,0.5)] md:p-5">
            <div>
              <span className="block text-[10px] tracking-[0.24em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block h-px w-7 bg-[color:var(--milk)]/60" />
              <span className="mt-3 block text-[10px] uppercase leading-[1.5] tracking-[0.16em] sm:text-[11px]">
                {s.group}
              </span>
            </div>
            <span className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--milk)]/50 transition-colors duration-500 group-hover:bg-[color:var(--milk)] group-hover:text-ink">
              <svg
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
                aria-hidden="true"
              >
                <path d="M0 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
              </svg>
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
