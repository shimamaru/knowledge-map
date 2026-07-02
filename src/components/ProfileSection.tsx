import { LeafIcon } from "./icons";

export default function ProfileSection() {
  return (
    <section id="profile" className="flex items-start gap-4 border-t border-border px-6 py-10 sm:px-10">
      <LeafIcon className="h-7 w-7 shrink-0 text-foreground/60" />
      <div>
        <h2 className="text-sm tracking-wide">プロフィール</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/60">
          身体や心の違和感から、暮らし方・働き方・表現のしかたを考え続けています。
          <br />
          音声、文章、動画で記録しています。
        </p>
      </div>
    </section>
  );
}
