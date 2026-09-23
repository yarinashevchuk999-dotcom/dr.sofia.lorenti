"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type ParallaxProps = {
  children: ReactNode;
  /** positive = element drifts up as you scroll past it */
  speed?: number;
  className?: string;
  style?: CSSProperties;
  /** also scale the inner content slightly while in view */
  zoom?: number;
};

export default function Parallax({
  children,
  speed = 0.08,
  className,
  style,
  zoom = 0,
}: ParallaxProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const el = outer.current;
      const target = inner.current;
      if (!el || !target) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // skip work while the element is well outside the viewport
      if (rect.bottom < -vh || rect.top > vh * 2) return;
      const elCenter = rect.top + rect.height / 2;
      const fromCenter = elCenter - vh / 2;

      const translate = -(fromCenter * speed);

      let scale = 1;
      if (zoom > 0) {
        const progress = 1 - Math.min(1, Math.abs(fromCenter) / (vh * 1.2));
        scale = 1 + progress * zoom;
      }

      target.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
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
  }, [speed, zoom]);

  return (
    <div ref={outer} className={className} style={style}>
      <div
        ref={inner}
        style={{
          height: "100%",
          width: "100%",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
