import Image from "next/image";

export default function Hero() {
  const titleClass =
    "font-serif-jp text-[15px] leading-snug whitespace-nowrap min-[360px]:text-[17px] min-[400px]:text-[19px] sm:text-3xl lg:text-[32px] xl:text-[40px] 2xl:text-5xl";

  return (
    <section className="flex flex-col items-start gap-10 px-6 py-14 text-left sm:px-10 sm:py-20 lg:flex-row lg:items-center lg:gap-10">
      <div className="min-w-0 lg:flex-1">
        <h1 className={titleClass}>
          書いたメモが、埋もれずに使える場所へ。
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/60 sm:text-base">
          Obsidianは難しいツールだと思われがちだけど、
          <br />
          はじめは分類もタグ付けもしなくていい。
          <br />
          初心者が迷わず始められる使い方を記録しています。
        </p>
      </div>
      <div className="mx-auto w-full max-w-[220px] shrink-0 sm:max-w-[280px] lg:mx-0 xl:max-w-[360px]">
        <Image
          src="/hero-illustration.png"
          alt="ヘッドホンをつけてノートに書き込む人のイラスト"
          width={1723}
          height={913}
          priority
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
