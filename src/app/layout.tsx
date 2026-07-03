import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keika",
  description: "身体と心の感覚を、置き去りにしなくていい。そう思える記録を、少しずつ積み重ねています。",
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
