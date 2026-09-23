import {
  DEFAULT_LANG,
  translations,
  type Lang,
} from "@/i18n/translations";

const STORAGE_KEY = "sl-lang";

let currentLang: Lang = DEFAULT_LANG;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLang(): Lang {
  return currentLang;
}

export function getServerLang(): Lang {
  return DEFAULT_LANG;
}

export function setLang(next: Lang) {
  if (next === currentLang || !(next in translations)) return;

  const apply = () => {
    currentLang = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") document.documentElement.lang = next;
    emit();
  };

  const doc =
    typeof document !== "undefined"
      ? (document as Document & {
          startViewTransition?: (cb: () => void) => {
            finished?: Promise<unknown>;
            ready?: Promise<unknown>;
            updateCallbackDone?: Promise<unknown>;
          };
        })
      : null;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 2026: crossfade the whole page when the language changes
  if (doc?.startViewTransition && !reduce) {
    const vt = doc.startViewTransition(apply);
    // a skipped or timed-out transition rejects these — swallow so it does
    // not surface as an unhandled promise rejection
    const hush = () => {};
    vt.finished?.catch(hush);
    vt.ready?.catch(hush);
    vt.updateCallbackDone?.catch(hush);
  } else {
    apply();
  }
}

/** Called once on the client to pick up a previously stored choice. */
export function hydrateLang() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && stored in translations && stored !== currentLang) {
      currentLang = stored;
      document.documentElement.lang = stored;
      emit();
    }
  } catch {
    /* ignore */
  }
}
