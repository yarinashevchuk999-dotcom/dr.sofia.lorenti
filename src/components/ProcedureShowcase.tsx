"use client";

import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";
import { openBookingModal } from "@/lib/bookingModalStore";

type Item = { name: string; price: string; desc: string };

/**
 * One photo per row, index(es) into `items` sharing that photo — lets
 * Consultation + Follow-up consultation sit together under one image,
 * exactly as asked, while every other procedure gets its own row.
 */
const ROWS: { img: string; indices: number[]; w: number; h: number }[] = [
  { img: "/proc-consultation.jpg", indices: [0, 1], w: 946, h: 1280 },
  { img: "/proc-peeling.jpg", indices: [2], w: 714, h: 1280 },
  { img: "/proc-cleansing.jpg", indices: [3], w: 1600, h: 1195 },
  { img: "/proc-lips.jpg", indices: [4], w: 1600, h: 1195 },
  { img: "/proc-botox.jpg", indices: [5], w: 1600, h: 1195 },
  { img: "/proc-biorevit.jpg", indices: [6], w: 1600, h: 1195 },
  { img: "/proc-vectorlift.jpg", indices: [7], w: 1600, h: 1195 },
  { img: "/proc-blanche.jpg", indices: [8], w: 1600, h: 1195 },
];

/**
 * Full-bleed photo/text rows, checkerboarded left/right, rows touching
 * (no gap) — text-left rows sit on plain background, photo-left rows get
 * a warm ivory fill behind the text, matching the reference exactly:
 * heading → paragraph → rule → small-caps price line.
 */
export default function ProcedureShowcase({ items }: { items: Item[] }) {
  const { t } = useLang();
  return (
    <div className="w-full">
      {ROWS.map((row, i) => {
        const photoRight = i % 2 === 1;
        const tanFill = i % 2 === 0;
        const heading = items[row.indices[0]].name;
        const paragraph = row.indices.map((idx) => items[idx].desc).join(" ");
        const priceLine = row.indices
          .map((idx) => `${items[idx].name} — ${items[idx].price}`)
          .join("   ·   ");

        return (
          <Reveal
            key={row.img}
            variant={photoRight ? "right" : "left"}
            className={`grid md:items-stretch ${
              photoRight ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr]"
            }`}
          >
            <div
              className={`relative h-64 w-full overflow-hidden sm:h-80 md:h-auto md:min-h-[420px] ${
                photoRight ? "md:order-2" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={row.img}
                alt={heading}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                width={row.w}
                height={row.h}
              />
            </div>
            <div
              className={`flex flex-col justify-center gap-5 px-6 py-10 sm:px-10 md:px-14 md:py-16 ${
                tanFill ? "bg-[color:var(--ivory)]" : ""
              }`}
            >
              <h3 className="display text-2xl uppercase leading-tight text-ink md:text-3xl">
                {heading}
              </h3>
              <p className="text-sm leading-relaxed text-brown md:text-base">
                {paragraph}
              </p>
              <div className="border-t border-line pt-4 text-left text-[11px] uppercase tracking-[0.2em] text-[color:var(--taupe-solid)]">
                {priceLine}
              </div>
              <button
                type="button"
                onClick={() => openBookingModal(heading)}
                className="btn-lift group inline-flex w-fit items-center gap-3 self-start bg-gradient-to-b from-[color:var(--gold-soft)] to-[color:var(--gold)] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-[color:var(--gold-ink)] shadow-[0_10px_26px_rgba(207,161,90,0.22)] hover:brightness-110"
              >
                {t.nav.book}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
