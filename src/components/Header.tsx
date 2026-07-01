import { SearchIcon } from "./icons";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10">
      <span className="font-serif-jp text-xl tracking-wide">Keika</span>
      <nav className="hidden items-center gap-8 text-sm sm:flex">
        <a href="#" className="transition-colors hover:text-foreground">
          記録
        </a>
        <a href="#" className="transition-colors hover:text-foreground">
          入口
        </a>
        <a href="#" className="transition-colors hover:text-foreground">
          プロフィール
        </a>
        <span className="h-4 w-px bg-border" />
        <SearchIcon className="h-4 w-4 transition-colors hover:text-foreground" />
      </nav>
      <SearchIcon className="h-4 w-4 sm:hidden" />
    </header>
  );
}
