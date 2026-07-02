import Link from "next/link";
import { SearchIcon } from "./icons";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10">
      <Link href="/" className="font-serif-jp text-xl tracking-wide">
        Keika
      </Link>
      <nav className="hidden items-center gap-6 text-sm sm:flex">
        <Link href="/records" className="transition-colors hover:text-foreground">
          記録
        </Link>
        <a href="#topics" className="transition-colors hover:text-foreground">
          入口
        </a>
        <a href="#profile" className="transition-colors hover:text-foreground">
          プロフィール
        </a>
        <span className="h-4 w-px bg-border" />
        <form action="/records" className="flex items-center gap-2">
          <input
            type="search"
            name="q"
            aria-label="投稿を検索"
            placeholder="検索"
            className="h-8 w-36 rounded-full border border-border bg-card px-3 text-xs outline-none transition-colors placeholder:text-foreground/35 focus:border-foreground/40"
          />
          <button
            type="submit"
            aria-label="検索"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground/40"
          >
            <SearchIcon className="h-4 w-4" />
          </button>
        </form>
      </nav>
      <Link
        href="/records"
        aria-label="検索"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border sm:hidden"
      >
        <SearchIcon className="h-4 w-4" />
      </Link>
    </header>
  );
}
