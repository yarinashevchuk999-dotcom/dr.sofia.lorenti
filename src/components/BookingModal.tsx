"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useLang } from "@/components/LangProvider";
import RecoloredPortrait from "@/components/RecoloredPortrait";
import { submitBooking } from "@/lib/submitBooking";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import {
  closeBookingModal,
  getIsOpen,
  getServerIsOpen,
  getSource,
  subscribe,
} from "@/lib/bookingModalStore";

const HERO = "/hero.jpg";

export default function BookingModal() {
  const { t, lang } = useLang();
  const isOpen = useSyncExternalStore(subscribe, getIsOpen, getServerIsOpen);
  const source = useSyncExternalStore(subscribe, getSource, () => null);
  const [entered, setEntered] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEntered(false);
      setSent(false);
      setSending(false);
      setError(false);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBookingModal();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      unlockScroll();
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 sm:p-6 ${
        entered ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={t.booking.heading}
    >
      <button
        type="button"
        aria-label={t.booking.close}
        onClick={() => closeBookingModal()}
        className="absolute inset-0 bg-black/70 [backdrop-filter:blur(6px)]"
      />

      <div
        className={`relative grid w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--milk)] shadow-[0_30px_90px_rgba(0,0,0,0.5)] transition-all duration-300 sm:rounded-[28px] md:grid-cols-2 ${
          entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label={t.booking.close}
          onClick={() => closeBookingModal()}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[color:var(--ink)] transition-colors hover:border-white/50"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className="relative hidden min-h-[220px] md:block">
          <RecoloredPortrait
            src="/doctor-portrait.jpg"
            referenceSrc={HERO}
            alt="DR. SOFIA LORENTI"
            width={880}
            height={1280}
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div className="flex flex-col justify-center gap-5 px-6 py-10 sm:px-10 sm:py-12">
          <div>
            <h2 className="display text-2xl uppercase tracking-[0.06em] text-ink sm:text-3xl">
              {t.booking.heading}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-brown">
              {source
                ? `${source} — ${t.booking.lead.charAt(0).toLowerCase()}${t.booking.lead.slice(1)}`
                : t.booking.lead}
            </p>
          </div>

          {sent ? (
            <p className="text-sm leading-relaxed text-ink">{t.booking.success}</p>
          ) : (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                setSending(true);
                setError(false);
                const ok = await submitBooking({
                  name: String(data.get("name") ?? ""),
                  phone: String(data.get("phone") ?? ""),
                  source: source ?? "",
                  lang,
                });
                setSending(false);
                if (ok) {
                  setSent(true);
                } else {
                  setError(true);
                }
              }}
            >
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--taupe-solid)]">
                  {t.booking.name}
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-2 w-full border-b border-line bg-transparent pb-2 text-ink outline-none transition-colors focus:border-[color:var(--gold)]"
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--taupe-solid)]">
                  {t.booking.phone}
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-2 w-full border-b border-line bg-transparent pb-2 text-ink outline-none transition-colors focus:border-[color:var(--gold)]"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="btn-lift group inline-flex w-full items-center justify-center gap-3 bg-gradient-to-b from-[color:var(--gold-soft)] to-[color:var(--gold)] px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-[color:var(--gold-ink)] shadow-[0_12px_30px_rgba(207,161,90,0.25)] hover:brightness-110 disabled:opacity-60 sm:w-fit"
              >
                {sending ? t.booking.sending : t.booking.submit}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
              {error && (
                <p className="text-xs text-red-400">{t.booking.error}</p>
              )}
              <p className="text-xs text-[color:var(--taupe-solid)]">
                {t.booking.disclaimer}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
