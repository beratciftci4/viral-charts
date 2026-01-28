import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- İŞTE SİHİRLİ ANAHTAR BU SATIR!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Viral Charts",
  description: "Create aesthetic charts for social media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}