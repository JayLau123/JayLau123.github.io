import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chuanyu Liu",
  description:
    "Academic website for Chuanyu Liu, a computational chemistry and AI for science researcher working on quantum chemistry, DFT, and physics-informed machine learning.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Chuanyu Liu",
    description:
      "Computational chemistry, AI for science, quantum chemistry, DFT, and physics-informed machine learning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
