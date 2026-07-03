import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keika",
  description:
    "まだ言葉にならないものを、少しずつ形にする。違和感や思考を言葉にしながら、前に進むための場所です。",
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
