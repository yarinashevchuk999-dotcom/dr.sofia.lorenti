"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

/**
 * First-load "power on" gate: a black screen with a single button in the
 * middle. Clicking it plays a short CRT turn-on and reveals the site, which
 * fades up from dark. Shown on every fresh page load.
 */
export default function IntroGate() {
  const { t } = useLang();
  const [phase, setPhase] = useState<"idle" | "entering" | "done">("idle");
  const timer = useRef<number | undefined>(undefined);

  // hold the scroll lock for the gate's whole lifetime (idle + entering) —
  // keyed off `phase`, not mount/unmount: this component is always rendered
  // by the page (it just returns null once "done"), so it never actually
  // unmounts and a mount-only effect's cleanup would never fire.
  useEffect(() => {
    if (phase === "done") return;
    lockScroll();
    return () => unlockScroll();
  }, [phase]);

  useEffect(() => {
    if (phase !== "idle") return;

    // a URL hash left over from an earlier visit (e.g. #faq from a nav
    // click) makes the browser jump straight to that section on load — and
    // keeps re-applying that jump as late-loading fonts/video/images shift
    // the layout, even after we've scrolled back to 0 and stripped the hash
    // from the URL. Pin the scroll at 0 for as long as the gate is up so
    // every one of those re-jumps gets corrected immediately.
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const pin = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) window.scrollTo(0, 0);
    };
    pin();
    const retries = [0, 50, 150, 300, 600, 1000, 1600, 2400].map((delay) =>
      window.setTimeout(pin, delay),
    );
    window.addEventListener("scroll", pin, { passive: true });

    return () => {
      retries.forEach(window.clearTimeout);
      window.removeEventListener("scroll", pin);
    };
  }, [phase]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (phase === "done") return null;

  const enter = () => {
    if (phase !== "idle") return;
    setPhase("entering");
    document.documentElement.classList.add("site-lit");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(() => setPhase("done"), reduce ? 260 : 1150);
  };

  return (
    <div
      className={`intro-gate${phase === "entering" ? " is-entering" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={t.intro.aria}
    >
      <button
        type="button"
        onClick={enter}
        className="intro-power"
        aria-label={t.intro.button}
      >
        <span className="intro-power-ring" />
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 3.5v8.5" />
          <path d="M6.6 6.9a7.6 7.6 0 1 0 10.8 0" />
        </svg>
      </button>
      <span className="intro-hint">{t.intro.button}</span>
    </div>
  );
}
