import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keika",
  description:
    "まだ言葉にならないものを、少しずつ形にする。言葉にすることで、自分が楽になる。その記録が、誰かの手がかりにもなる。そんなサイトを目指しています。",
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
