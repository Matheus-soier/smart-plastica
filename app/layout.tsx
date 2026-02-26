import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Plástica | Lipo HD",
  description:
    "Landing page de procedimento da Smart Plástica com foco em Lipo HD, jornada segura e avaliação personalizada.",
  icons: {
    icon: [{ url: "/brand/favicon-smart-oficial.png", type: "image/png" }],
    shortcut: [{ url: "/brand/favicon-smart-oficial.png", type: "image/png" }],
    apple: [{ url: "/brand/favicon-smart-oficial.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${sourceSans.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
