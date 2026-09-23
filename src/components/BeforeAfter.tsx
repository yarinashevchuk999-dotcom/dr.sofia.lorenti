"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  image: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export default function BeforeAfter({
  image,
  beforeLabel = "До",
  afterLabel = "Після",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(3, Math.min(97, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none overflow-hidden bg-beige"
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
    >
      {/* after — full */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={afterLabel}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
      />
      <span className="absolute right-6 top-6 z-20 text-[11px] uppercase tracking-[0.28em] text-white/85">
        {afterLabel}
      </span>

      {/* before — clipped overlay */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={beforeLabel}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] [filter:grayscale(0.5)_contrast(0.9)_brightness(1.03)]"
        />
        <span className="absolute left-6 top-6 text-[11px] uppercase tracking-[0.28em] text-white/85">
          {beforeLabel}
        </span>
      </div>

      {/* handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white/75"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/10 backdrop-blur-md">
          <span className="translate-y-[-1px] text-sm tracking-[0.15em] text-white/90">
            ‹ ›
          </span>
        </div>
      </div>
    </div>
  );
}
