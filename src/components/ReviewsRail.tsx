"use client";

import { useEffect, useRef, useState } from "react";

type Review = { quote: string; name: string; detail: string };

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="h-[15px] w-[15px] fill-[#cfa15a]">
      <path d="M10 1.2l2.72 5.63 6.14.87-4.44 4.36 1.05 6.14L10 15.2l-5.47 2.9 1.05-6.14L1.14 7.7l6.14-.87L10 1.2z" />
    </svg>
  );
}

/**
 * Horizontal rail of review cards. Same behaviour as the services rail —
 * panning is driven by where the pointer sits over the rail (left → glide to
 * the start, right → to the end, centre → rest). Touch devices use native
 * swipe. A one-time nudge on first view signals that it moves.
 */
export default function ReviewsRail({ items }: { items: Review[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  // "there's more →" hint — visible until the rail is scrolled (near) the
  // end, so it never sits there for someone who's already seen everything
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScroll = () => rail.scrollWidth - rail.clientWidth;

    const onScrollHint = () => {
      setShowHint(rail.scrollLeft < maxScroll() - 4);
    };
    onScrollHint();
    rail.addEventListener("scroll", onScrollHint, { passive: true });

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
      rail.removeEventListener("scroll", onScrollHint);
      rail.removeEventListener("pointermove", onMove);
      rail.removeEventListener("pointerleave", rest);
      rail.removeEventListener("pointercancel", rest);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="no-scrollbar -mx-6 flex gap-5 overflow-x-auto px-6 pb-1 sm:-mx-10 sm:gap-6 sm:px-10 md:-mx-20 md:px-20"
      >
        {items.map((tm, i) => (
          <figure
            key={tm.name + i}
            className="flex w-[82vw] max-w-[420px] shrink-0 flex-col rounded-xl border border-line bg-[color:var(--ivory)] p-7 shadow-[0_2px_14px_rgba(50,43,36,0.05)] sm:w-[52vw] md:w-[38vw] md:p-9 lg:w-[29vw]"
            style={{ borderBottomWidth: 3, borderBottomColor: "#cfa15a" }}
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink md:text-base">
              {tm.quote}
            </blockquote>
            <figcaption className="mt-7 text-sm">
              <div className="font-medium text-ink">— {tm.name}</div>
              <div className="mt-1 text-[13px] text-[color:var(--taupe-solid)]">
                {tm.detail}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* "more reviews →" hint — fades out once the rail reaches its end */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-l from-[color:var(--ivory)] via-[color:var(--ivory)]/80 to-transparent text-[color:#cfa15a] transition-opacity duration-500 sm:right-2 ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="rail-hint h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
