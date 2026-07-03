import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keika",
  description: "身体と心の感覚を、置き去りにしたくない人へ。違和感には、ちゃんと理由がある。言葉にして、少しずつ前に進んでいく。",
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
