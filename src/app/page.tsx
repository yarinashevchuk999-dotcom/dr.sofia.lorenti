"use client";

import { useRef, useState } from "react";
import SiteNav from "@/components/SiteNav";
import SmoothScroll from "@/components/SmoothScroll";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import Faq from "@/components/Faq";
import RecoloredPortrait from "@/components/RecoloredPortrait";
import ReviewsRail from "@/components/ReviewsRail";
import ProcedureShowcase from "@/components/ProcedureShowcase";
import BookingModal from "@/components/BookingModal";
import CustomCursor from "@/components/CustomCursor";
import { useLang } from "@/components/LangProvider";
import { openBookingModal } from "@/lib/bookingModalStore";
import { submitBooking } from "@/lib/submitBooking";
import { useHeroCinematicReveal } from "@/hooks/useHeroCinematicReveal";

const HERO = "/hero.jpg";
const HERO_VIDEO =
  "https://res.cloudinary.com/sqswmysg/video/upload/v1789500632/hero.mp4";

export default function Home() {
  const { t, lang } = useLang();
  const [contactState, setContactState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const heroVideoWrapRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLParagraphElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  useHeroCinematicReveal(
    heroTrackRef,
    heroVideoWrapRef,
    heroEyebrowRef,
    heroTitleRef,
    heroDescRef,
    heroCtaRef,
  );

  return (
    <>
      <BookingModal />
      <CustomCursor />
      <div className="scroll-progress" aria-hidden="true" />
      <div id="top" className="relative bg-[color:var(--bg)]">
      <div className="grain" aria-hidden="true" />
      <SmoothScroll />

      {/* ===================== HERO ===================== */}
      {/* extra scroll room so the video below can scrub while the section is pinned */}
      <div ref={heroTrackRef} className="relative h-[200svh]">
      <section className="sticky top-0 h-[100svh] min-h-[620px] w-full overflow-hidden bg-[color:var(--bg)]">
        <SiteNav />
        {/* soft golden bloom behind the frame */}
        <div className="hero-frame-bloom pointer-events-none absolute inset-5 rounded-2xl md:inset-12 md:rounded-[36px]" />

        {/* central sharp Hero block — framed, pulled back a touch to show more of her (head + neck) */}
        <div className="absolute inset-5 overflow-hidden rounded-2xl border border-white/10 md:inset-12 md:rounded-[36px]">
          <Parallax speed={0.14} className="absolute inset-0">
            {/* dedicated zoom wrapper — keeps the scroll-driven scale off
                the video itself, so it never fights .hero-media's own
                load-in animation */}
            <div ref={heroVideoWrapRef} className="h-full w-full">
              <video
                src={HERO_VIDEO}
                poster={HERO}
                aria-label="DR. SOFIA LORENTI"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="hero-media h-full w-full scale-105 object-cover object-[70%_32%]"
              />
            </div>
          </Parallax>
        </div>

        {/* flat scrim (no gradient) */}
        <div className="absolute inset-0 bg-black/20" />

        {/* living golden rim — travelling glints on the frame edge */}
        <div className="hero-frame-rim pointer-events-none absolute inset-5 rounded-2xl md:inset-12 md:rounded-[36px]" />

        <div className="relative z-10 flex h-full translate-y-[14vh] flex-col items-center justify-center px-6 text-center text-[color:var(--ink)]">
          <p
            ref={heroEyebrowRef}
            className="eyebrow hero-copy mb-4 translate-y-[6px] text-white/75 [text-shadow:0_1px_20px_rgba(0,0,0,0.35)] md:mb-6"
          >
            {t.hero.role}
          </p>
          {/* overflow-hidden mask — the h1 emerges from behind this edge as
              you scroll instead of just fading in; visually identical at
              rest. pb-14/-mb-14 give the lift distance room inside the mask
              (matching titleLiftPx below) so the animation never clips the
              second line, then cancel the extra box height so nothing below
              shifts down. */}
          <div className="overflow-hidden pb-14 -mb-14">
            <h1
              ref={heroTitleRef}
              className="display hero-heading whitespace-nowrap text-[clamp(2.35rem,9.9vw,10rem)] [text-shadow:0_2px_60px_rgba(0,0,0,0.18)]"
            >
              DR. SOFIA
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              LORENTI
            </h1>
          </div>

          <div
            ref={heroDescRef}
            className="mt-8 flex flex-col items-center gap-6 md:mt-10"
          >
            <span className="h-px w-14 bg-white/45" />
            <p className="hero-copy max-w-md text-[11px] uppercase text-white/80 md:text-xs">
              {t.hero.subtitleA}
              <br />
              {t.hero.subtitleB}
            </p>
          </div>

          <div
            ref={heroCtaRef}
            className="mt-10 flex -translate-y-[6px] items-center justify-center md:mt-12"
          >
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="btn-lift group inline-flex items-center gap-3 bg-gradient-to-b from-[color:var(--gold-soft)] to-[color:var(--gold)] px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-[color:var(--gold-ink)] shadow-[0_12px_30px_rgba(207,161,90,0.25)] hover:brightness-110"
            >
              {t.hero.ctaPrimary}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-[1360px] items-center justify-between px-6 text-[10px] uppercase tracking-[0.28em] text-white/70 md:bottom-9 md:px-10">
          <span className="flex items-center gap-3">
            <span className="h-8 w-px bg-white/40" />
            {t.hero.scroll}
          </span>
          <span>01 / 03</span>
        </div>
      </section>
      </div>

      {/* ============= TRUST · ABOUT · SERVICES · REVIEWS · FAQ · CONTACT =============
          one continuous panel — a single shared frame, hairline dividers
          between sections instead of a dark gap + repeated frame each time */}
      <section className="relative bg-[color:var(--bg)] px-5 pb-12 pt-4 sm:pb-16 sm:pt-6 md:px-12">
        <div className="frame-glow relative overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--milk)] md:rounded-[36px]">
          {/* --- about --- */}
          <div
            id="about"
            className="relative flex flex-col md:flex-row"
          >
            <div className="relative flex min-h-[45vh] flex-1 flex-col md:min-h-0">
              <h2 className="display px-5 pt-8 text-left text-3xl uppercase tracking-[0.1em] text-ink sm:pt-10 sm:text-4xl md:px-12 md:pt-12 md:text-5xl">
                DR. SOFIA LORENTI
              </h2>
              <p className="max-w-sm px-5 pt-2 text-left text-xs uppercase tracking-[0.18em] text-[color:var(--taupe-solid)] md:max-w-md md:px-12 md:text-sm">
                {t.about.tagline}
              </p>
              <div className="flex flex-1 flex-col justify-between gap-8 px-5 py-4 md:px-12 md:py-10">
                <div className="flex flex-col gap-3">
                  <p className="max-w-md text-left text-sm leading-relaxed text-brown md:max-w-lg md:text-base">
                    {t.about.p1}
                  </p>
                  <p className="max-w-md text-left text-sm leading-relaxed text-brown md:max-w-lg md:text-base">
                    {t.about.p2}
                  </p>
                  <p className="max-w-md text-left text-sm leading-relaxed text-brown md:max-w-lg md:text-base">
                    {t.about.p3}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="btn-lift group inline-flex w-fit items-center gap-3 bg-gradient-to-b from-[color:var(--gold-soft)] to-[color:var(--gold)] px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-[color:var(--gold-ink)] shadow-[0_12px_30px_rgba(207,161,90,0.25)] hover:brightness-110"
                >
                  {t.about.cta}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
            <div className="relative aspect-[4/3] flex-1 md:aspect-square">
              <RecoloredPortrait
                src="/doctor-portrait.jpg"
                referenceSrc={HERO}
                alt="DR. SOFIA LORENTI"
                className="h-full w-full object-cover object-top"
                loading="lazy"
                width={880}
                height={1280}
              />
            </div>
          </div>

          {/* --- trust stats — full-width strip, under the about photo, above procedures --- */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line px-5 py-10 sm:px-10 md:grid-cols-4 md:gap-x-8 md:px-12 md:py-12">
            {t.trust.map((item, i) => {
              const accent = /[+%]$/.test(item.value) ? item.value.slice(-1) : "";
              const base = accent ? item.value.slice(0, -1) : item.value;
              return (
                <Reveal
                  key={item.label}
                  delay={i * 80}
                  className="text-left md:border-l md:border-line md:pl-8 md:first:border-l-0 md:first:pl-0"
                >
                  <div className="max-w-[18ch] text-[12px] font-medium leading-snug text-ink md:text-sm">
                    {item.label}
                  </div>
                  <div className="display mt-1.5 text-2xl text-ink md:text-3xl">
                    {base}
                    {accent && <span className="text-[#cfa15a]">{accent}</span>}
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* --- services --- */}
          <div
            id="services"
            className="relative flex w-full flex-col items-center py-8 md:py-10"
          >
            <Reveal
              variant="fade"
              className="mb-8 flex flex-col items-center px-5 text-center md:mb-10"
            >
              <div className="rounded-[12px] bg-gradient-to-b from-[color:var(--gold-soft)] to-[color:var(--gold)] px-10 py-3 shadow-[0_18px_55px_rgba(201,150,47,0.22)] md:px-14 md:py-4">
                <h2 className="display text-[clamp(1.2rem,2.2vw,1.7rem)] uppercase tracking-[0.32em] text-[color:var(--gold-ink)]">
                  {t.labels.procedures}
                </h2>
              </div>
              <span className="proc-accent mt-5 h-px w-16 md:w-24" />
              <p className="mt-4 max-w-md text-[11px] uppercase leading-relaxed tracking-[0.2em] text-[color:var(--taupe-solid)] md:text-xs">
                {t.labels.proceduresLead}
              </p>
            </Reveal>

            <ProcedureShowcase items={t.services} />
          </div>

          {/* --- reviews --- */}
          <div
            id="testimonials"
            className="relative flex min-h-screen w-full flex-col px-6 py-12 sm:px-10 md:justify-center md:px-20 md:py-16"
          >
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.12] text-ink">
                {t.reviews.heading}{" "}
                <span className="text-[#cfa15a]">{t.reviews.headingAccent}</span>
              </h2>
              <span className="proc-accent mx-auto mt-7 block h-px w-16 md:w-24" />
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-brown md:text-base">
                {t.reviews.lead}
              </p>
            </Reveal>

            <Reveal variant="fade" delay={80} className="mt-10 md:mt-14">
              <ReviewsRail items={t.testimonials} />
            </Reveal>
          </div>

          {/* --- faq --- */}
          <div
            id="faq"
            className="relative flex w-full flex-col px-6 pb-12 pt-8 sm:px-10 md:px-20 md:pb-16 md:pt-10"
          >
            <div className="grid gap-10 md:grid-cols-12 md:gap-16">
              <Reveal className="md:col-span-4">
                <h2 className="display text-[clamp(1.8rem,3.4vw,2.8rem)] text-ink">
                  {t.labels.faq}
                </h2>
                <span className="proc-accent mt-7 block h-px w-16 md:w-24" />
              </Reveal>
              <div className="md:col-span-7 md:col-start-6">
                <Reveal variant="fade">
                  <Faq items={t.faq} />
                </Reveal>
              </div>
            </div>
          </div>

          {/* --- contact --- */}
          <div
            id="contact"
            className="relative flex min-h-screen w-full flex-col overflow-hidden px-6 py-12 sm:px-10 md:justify-center md:px-20 md:py-16"
          >
            {/* photo fills the whole section — every field/label sits on top of it */}
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/contact-portrait.jpg"
                alt="DR. SOFIA LORENTI"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1280}
                height={720}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10">
              <div className="grid gap-6 md:grid-cols-12 md:gap-16">
                <Reveal className="md:col-span-5">
                  <h2 className="display text-[clamp(1.8rem,3.6vw,2.8rem)] text-[color:var(--ink)] [text-shadow:0_2px_30px_rgba(0,0,0,0.3)]">
                    {t.contact.heading}
                  </h2>
                  <span className="mt-7 block h-px w-16 bg-[#cfa15a] md:w-24" />
                  <dl className="mt-6 space-y-3 text-sm">
                    {(
                      [
                        ["address", t.contact.fields.address, t.contact.values.address],
                        ["phone", t.contact.fields.phone, t.contact.values.phone],
                        ["email", t.contact.fields.email, t.contact.values.email],
                        ["hours", t.contact.fields.hours, t.contact.values.hours],
                        [
                          "instagram",
                          t.contact.fields.instagram,
                          t.contact.values.instagram,
                        ],
                        [
                          "license",
                          t.contact.fields.license,
                          t.contact.values.license,
                        ],
                      ] as const
                    ).map(([key, label, value]) => (
                      <div
                        key={key}
                        className="flex justify-between gap-6 border-b border-white/20 pb-2"
                      >
                        <dt className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                          {label}
                        </dt>
                        <dd className="text-right text-[color:var(--ink)]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
                  {contactState === "sent" ? (
                    <p className="text-sm leading-relaxed text-[color:var(--ink)]">
                      {t.booking.success}
                    </p>
                  ) : (
                    <form
                      className="space-y-4"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const data = new FormData(e.currentTarget);
                        setContactState("sending");
                        const ok = await submitBooking({
                          name: String(data.get("name") ?? ""),
                          phone: String(data.get("phone") ?? ""),
                          email: String(data.get("email") ?? ""),
                          message: String(data.get("message") ?? ""),
                          source: "contact-form",
                          lang,
                        });
                        setContactState(ok ? "sent" : "error");
                      }}
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {(
                          [
                            { name: "name", label: t.contact.form.name, type: "text" },
                            { name: "phone", label: t.contact.form.phone, type: "tel" },
                          ] as const
                        ).map((f) => (
                          <label key={f.name} className="block">
                            <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                              {f.label}
                            </span>
                            <input
                              type={f.type}
                              name={f.name}
                              required
                              className="mt-2 w-full border-b border-white/30 bg-transparent pb-2 text-[color:var(--ink)] outline-none transition-colors focus:border-white"
                            />
                          </label>
                        ))}
                      </div>
                      {(
                        [{ name: "email", label: t.contact.form.email, type: "email" }] as const
                      ).map((f) => (
                        <label key={f.name} className="block">
                          <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                            {f.label}
                          </span>
                          <input
                            type={f.type}
                            name={f.name}
                            className="mt-2 w-full border-b border-white/30 bg-transparent pb-2 text-[color:var(--ink)] outline-none transition-colors focus:border-white"
                          />
                        </label>
                      ))}
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                          {t.contact.form.message}
                        </span>
                        <textarea
                          name="message"
                          rows={2}
                          className="mt-2 w-full resize-none border-b border-white/30 bg-transparent pb-2 text-[color:var(--ink)] outline-none transition-colors focus:border-white"
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={contactState === "sending"}
                        className="btn-lift group inline-flex items-center gap-3 bg-gradient-to-b from-[color:var(--gold-soft)] to-[color:var(--gold)] px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-[color:var(--gold-ink)] shadow-[0_12px_30px_rgba(207,161,90,0.25)] hover:brightness-110 disabled:opacity-60"
                      >
                        {contactState === "sending"
                          ? t.booking.sending
                          : t.contact.form.submit}
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </button>
                      {contactState === "error" && (
                        <p className="text-xs text-red-400">{t.booking.error}</p>
                      )}
                      <p className="text-xs text-white/60">
                        {t.contact.form.disclaimer}
                      </p>
                    </form>
                  )}
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-[color:var(--bg)] text-[color:var(--ink)]">
        <div className="mx-auto max-w-[1360px] px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-10 md:grid-cols-3 md:items-start md:gap-16">
            <div>
              <div className="display text-3xl tracking-[0.12em]">SL</div>
              <p className="mt-4 max-w-xs text-sm text-white/50">
                {t.footer.tagline}
              </p>
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="btn-lift group mt-6 inline-flex items-center gap-3 bg-gradient-to-b from-[color:var(--gold-soft)] to-[color:var(--gold)] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-[color:var(--gold-ink)] shadow-[0_10px_26px_rgba(207,161,90,0.22)] hover:brightness-110"
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
            <div className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.2em] text-white/60">
              <a href="#about" className="w-fit hover:text-white">
                {t.footer.about}
              </a>
              <a href="#services" className="w-fit hover:text-white">
                {t.footer.services}
              </a>
              <a href="#contact" className="w-fit hover:text-white">
                {t.footer.contact}
              </a>
            </div>
            <div className="flex flex-col gap-3 text-[11px] tracking-[0.12em] text-white/60">
              <a
                href={`tel:${t.contact.values.phone.replace(/[^+\d]/g, "")}`}
                className="w-fit hover:text-white"
              >
                {t.contact.values.phone}
              </a>
              <a
                href={`mailto:${t.contact.values.email}`}
                className="w-fit hover:text-white"
              >
                {t.contact.values.email}
              </a>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.2em]">
                <a
                  href={`https://instagram.com/${t.contact.values.instagram.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href={`https://t.me/${t.contact.values.instagram.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Telegram
                </a>
                <a
                  href={`https://facebook.com/${t.contact.values.instagram.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-2 border-t border-white/15 pt-8 text-[11px] uppercase tracking-[0.18em] text-white/40 sm:flex-row">
            <span>
              © {new Date().getFullYear()} {t.footer.rights}
            </span>
            <span>{t.footer.place}</span>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
