"use client";

import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children?: ReactNode;
  as?: ElementType;
  variant?: "up" | "fade" | "line" | "left" | "right";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
};

export default function Reveal({
  children,
  as = "div",
  variant = "up",
  delay = 0,
  className,
  style,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 15% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return createElement(
    as,
    {
      ref,
      className,
      "data-reveal": variant === "up" ? true : variant,
      style: { ...style, "--reveal-delay": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
