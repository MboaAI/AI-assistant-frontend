"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Correct hook to get current path
import { Assistant } from "../components/assistant-view";
import translations from "../translations";

type TranslationKeys = keyof typeof translations;

export default function Dashboard() {

  const pathname = usePathname(); // Get the current route path
  const [lang, setLang] = useState<TranslationKeys>("fr");
  const [t, setT] = useState(translations.fr);

  useEffect(() => {

    if (!pathname) return; // Ensure pathname is available
    const langFromPath = pathname.split("/")[1]; // Extract "lang" from route, e.g., "/en"

    const supportedLocales: TranslationKeys[] = ["en", "fr"];
    const validLang: TranslationKeys = supportedLocales.includes(langFromPath as TranslationKeys)
      ? (langFromPath as TranslationKeys)
      : "fr";

    setLang(validLang);
    setT(translations[validLang]);

  }, [pathname]);

  if (!t) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">

      <div className="mt-6" >
        <Assistant lang={lang} />
      </div>
    </div>
  );
}
