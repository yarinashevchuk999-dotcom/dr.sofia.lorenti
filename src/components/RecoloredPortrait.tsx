"use client";

import { useEffect, useState } from "react";

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    hue2rgb(p, q, h + 1 / 3) * 255,
    hue2rgb(p, q, h) * 255,
    hue2rgb(p, q, h - 1 / 3) * 255,
  ];
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

type Props = {
  src: string;
  /** image whose corner colour becomes the new background tone */
  referenceSrc: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
};

/**
 * Recolours the flat studio backdrop of `src` to match the background tone
 * sampled from `referenceSrc`, while leaving the subject (higher-saturation,
 * highlight/shadow) pixels untouched. Runs once client-side on a canvas.
 */
export default function RecoloredPortrait({
  src,
  referenceSrc,
  alt,
  className,
  loading,
  width,
  height,
}: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const [portrait, reference] = await Promise.all([
        loadImage(src),
        loadImage(referenceSrc),
      ]);

      const refCanvas = document.createElement("canvas");
      refCanvas.width = reference.naturalWidth;
      refCanvas.height = reference.naturalHeight;
      const rctx = refCanvas.getContext("2d");
      if (!rctx) return;
      rctx.drawImage(reference, 0, 0);
      const [rr, rg, rb] = rctx.getImageData(12, 12, 1, 1).data;
      const [targetH, targetS] = rgbToHsl(rr, rg, rb);

      const canvas = document.createElement("canvas");
      canvas.width = portrait.naturalWidth;
      canvas.height = portrait.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(portrait, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const [, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
        if (s < 0.14 && l > 0.45 && l < 0.92) {
          const [nr, ng, nb] = hslToRgb(targetH, Math.max(targetS, 0.16), l);
          data[i] = nr;
          data[i + 1] = ng;
          data[i + 2] = nb;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      if (!cancelled) setDataUrl(canvas.toDataURL("image/jpeg", 0.92));
    }

    run().catch(() => {
      /* fall back to the original image */
    });

    return () => {
      cancelled = true;
    };
  }, [src, referenceSrc]);

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={dataUrl ?? src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
    />
  );
}
