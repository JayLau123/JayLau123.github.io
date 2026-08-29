import type { Metadata } from "next";
import { AmbientGeometry } from "./components/ambient-geometry";
import "./globals.css";
import "katex/dist/katex.min.css";

const themeScript = `
  (function () {
    try {
      var savedTheme = window.localStorage.getItem("theme");
      var theme = savedTheme === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export const metadata: Metadata = {
  title: "Chuanyu Liu",
  description:
    "Academic website for Chuanyu Liu, a computational chemistry and AI for science researcher working on quantum chemistry, DFT, physics-informed machine learning, and photography.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Chuanyu Liu",
    description:
      "Computational chemistry, AI for science, quantum chemistry, DFT, physics-informed machine learning, and photography.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AmbientGeometry />
        {children}
      </body>
    </html>
  );
}
