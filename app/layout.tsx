import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chuanyu Liu",
  description:
    "Academic website for Chuanyu Liu, a computational materials researcher working on AI for materials, quantum chemistry, and physics-informed machine learning.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Chuanyu Liu",
    description:
      "Computational materials, AI for science, quantum chemistry, and physics-informed machine learning.",
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
