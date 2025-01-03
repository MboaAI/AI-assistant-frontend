// app/[lang]/layout.tsx
import { LanguageProvider } from "@/app/contexts/LanguageContext";

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <div className="flex-grow p-4 md:p-8">{children}</div>

      </div>
    </LanguageProvider>

  );
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}
