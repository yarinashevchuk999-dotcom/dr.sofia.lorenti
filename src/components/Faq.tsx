"use client";

import { useState } from "react";

type Item = { q: string; a: string };

export default function Faq({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-8 py-5 text-left md:py-7"
              aria-expanded={isOpen}
            >
              <span className="display max-w-2xl text-xl text-ink md:text-2xl">
                {item.q}
              </span>
              <span
                className={`mt-2 shrink-0 text-brown transition-transform duration-500 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 1v16M1 9h16"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-brown md:pb-8">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
