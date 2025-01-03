import "@/app/globals.css";
import translations from "@/app/translations";

export async function generateMetadata() {
  const t = translations.fr; // Replace `fr` with logic for dynamic locale selection if needed.

  return {
    title: t.title,
    description: "Empowering AI in Central Africa.",
    author: "MboaAI",
    openGraph: {
      title: t.title,
      type: "website",
      url: "https://mboa-ai.com/",
      siteName: "MboaAI",
      images: [
        {
          url: "https://mboa-ai.com/logo192.png",
          alt: "MboaAI Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      url: "https://mboa-ai.com/",
      creator: "@MboaAI",
      images: ["https://mboa-ai.com/logo192.png"],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-full flex flex-col ">
        <div className="flex-grow">{children}</div>
        <footer className="bg-gray-800 text-white py-4 px-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm">
              Powered by{" "}
              <a
                href="https://mboa-ai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300"
              >
                MboaAI
              </a>
            </p>
            <p className="text-xs mt-1">
              Copyright &copy; {new Date().getFullYear()} MboaAI. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
