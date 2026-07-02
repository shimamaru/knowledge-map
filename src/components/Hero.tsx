import Image from "next/image";

export default function Hero() {
  const titleClass =
    "font-serif-jp text-[15px] leading-snug whitespace-nowrap min-[360px]:text-[17px] min-[400px]:text-[19px] sm:text-3xl lg:text-[32px] xl:text-[40px] 2xl:text-5xl";

  return (
    <section className="flex flex-col items-start gap-10 px-6 py-14 text-left sm:px-10 sm:py-20 lg:flex-row lg:items-center lg:gap-10">
      <div className="min-w-0 lg:flex-1">
        <h1 className={titleClass}>
          身体と心の感覚を置き去りにしないで、
        </h1>
        <h1 className={titleClass}>
          生き方を考えていく記録。
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/60 sm:text-base">
          眠れなさ、働くことへの不安、孤独、表現したい気持ち。
          <br />
          日々の違和感を言葉にして、少しずつ生き方の地図にしていく。
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
