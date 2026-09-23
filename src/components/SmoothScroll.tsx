"use client";

import { useEffect } from "react";

/**
 * Smooth in-page anchor scrolling without the global CSS
 * `scroll-behavior: smooth` (which some embedded browsers choke on) — and
 * without the JS `scrollTo({ behavior: "smooth" })` shorthand either: it
 * turned out to silently no-op in this same class of embedded browser (the
 * click registered — the hash updated — but the page never actually moved).
 * Own rAF-eased scroll instead, so it's guaranteed to work everywhere.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    const animateScrollTo = (target: number) => {
      if (raf) cancelAnimationFrame(raf);
      if (reduce) {
        window.scrollTo(0, target);
        return;
      }
      const maxScroll = () =>
        document.documentElement.scrollHeight - window.innerHeight;
      const start = window.scrollY;
      const clampedTarget = Math.max(0, Math.min(target, maxScroll()));
      const distance = clampedTarget - start;
      const duration = Math.min(
        1000,
        Math.max(350, Math.abs(distance) * 0.5),
      );
      const startTime = performance.now();
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const step = (now: number) => {
        const p = Math.min(1, (now - startTime) / duration);
        window.scrollTo(0, start + distance * easeInOutCubic(p));
        if (p < 1) raf = requestAnimationFrame(step);
        else raf = 0;
      };
      raf = requestAnimationFrame(step);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute("href")!.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      const top =
        el.getBoundingClientRect().top + window.scrollY - (id === "top" ? 0 : 20);
      animateScrollTo(top);
      history.replaceState(null, "", id === "top" ? " " : `#${id}`);
    };

    document.addEventListener("click", onClick);

    // freeze the paint-heavy ambient animations while the page is scrolling
    const root = document.documentElement;
    let scrollTimer: number | undefined;
    const onScroll = () => {
      root.classList.add("is-scrolling");
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(
        () => root.classList.remove("is-scrolling"),
        180,
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
      root.classList.remove("is-scrolling");
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
