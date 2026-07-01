import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keika",
  description: "身体と心の感覚を置き去りにしないで、生き方を考えていく記録。",
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
