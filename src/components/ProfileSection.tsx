import { DocumentIcon } from "./icons";

export default function ProfileSection() {
  return (
    <section id="profile" className="flex items-start gap-4 px-6 py-10 sm:px-10">
      <DocumentIcon className="h-7 w-7 shrink-0 text-foreground/60" />
      <div>
        <h2 className="text-sm tracking-wide">プロフィール</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/60">
          書いたメモが埋もれてしまう悩みから、ObsidianとAIを組み合わせた使い方を試し続けています。
          <br />
          考えたことを資産として取り出せる形にする記録です。
        </p>
      </div>
    </section>
  );
}
