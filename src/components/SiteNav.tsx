"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { LANGS } from "@/i18n/translations";
import { openBookingModal } from "@/lib/bookingModalStore";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

export default function SiteNav() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.testimonials, href: "#testimonials" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return () => unlockScroll();
  }, [open]);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-6 z-50 flex justify-center px-5 pt-4 md:px-12 sm:pt-6">
      {/* z-50: the mobile overlay below is a sibling with its own z-40, and
          a positioned sibling with an explicit z-index always paints over
          one left at the default stacking level — without this the open/
          close button (and its X) would render underneath the overlay
          panel once it's open */}
      <nav className="pointer-events-auto relative z-50 flex w-full items-center justify-between gap-6 rounded-[16px] border border-white/10 bg-white/0 px-5 py-3 text-white shadow-[0_1px_20px_rgba(0,0,0,0.04)] [backdrop-filter:blur(16px)] sm:px-7 sm:py-4">
        {/* logo */}
        <a
          href="#top"
          className="display shrink-0 text-2xl leading-none tracking-[0.12em] sm:text-[1.7rem]"
          aria-label="DR. SOFIA LORENTI"
        >
          SL
        </a>

        {/* center links */}
        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="eyebrow opacity-80 transition-opacity duration-300 hover:opacity-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* right cluster */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="btn-lift eyebrow group hidden items-center gap-2 bg-gradient-to-b from-[color:var(--gold-soft)] to-[color:var(--gold)] px-5 py-2.5 text-[color:var(--gold-ink)] shadow-[0_8px_20px_rgba(207,161,90,0.25)] hover:brightness-110 md:inline-flex"
          >
            {t.nav.book}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </button>

          <div className="flex items-center gap-2">
            {LANGS.map(({ code, short }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`text-[11px] tracking-[0.15em] transition-opacity duration-300 ${
                  lang === code ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                {short}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-9 w-9 flex-col items-center justify-center gap-[5px] transition-colors duration-300 lg:hidden ${
              open ? "text-ink" : "text-white"
            }`}
          >
            <span
              className={`h-px w-5 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* mobile overlay */}
      <div
        className={`pointer-events-auto fixed inset-0 z-40 flex flex-col bg-ivory px-6 pb-10 pt-28 transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-6">
          {links.map((link, i) => (
            <li
              key={link.href}
              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(22px)",
                transitionDelay: open ? `${i * 70 + 80}ms` : "0ms",
              }}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="display block text-3xl text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div
          className="mt-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(22px)",
            transitionDelay: open ? `${links.length * 70 + 120}ms` : "0ms",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openBookingModal();
            }}
            className="btn-lift eyebrow group inline-flex items-center gap-2 bg-gradient-to-b from-[color:var(--gold-soft)] to-[color:var(--gold)] px-6 py-3 text-[color:var(--gold-ink)] shadow-[0_8px_20px_rgba(207,161,90,0.25)] hover:brightness-110"
          >
            {t.nav.bookConsult}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </button>
          <div className="flex gap-3 text-ink">
            {LANGS.map(({ code, short }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`text-xs tracking-[0.15em] ${
                  lang === code ? "opacity-100" : "opacity-40"
                }`}
              >
                {short}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
