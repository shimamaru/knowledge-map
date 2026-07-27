import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simu",
  description:
    "書いたメモが、埋もれずに使える場所へ。Obsidianは難しいツールだと思われがちだけど、はじめは分類もタグ付けもしなくていい。初心者が迷わず始められる使い方を記録しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
