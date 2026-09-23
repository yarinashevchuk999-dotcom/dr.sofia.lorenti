"use client";

import { useEffect, useSyncExternalStore } from "react";
import { translations } from "@/i18n/translations";
import {
  getLang,
  getServerLang,
  hydrateLang,
  setLang as setLangStore,
  subscribe,
} from "@/i18n/langStore";

export function useLang() {
  const lang = useSyncExternalStore(subscribe, getLang, getServerLang);

  useEffect(() => {
    hydrateLang();
  }, []);

  return { lang, setLang: setLangStore, t: translations[lang] };
}
