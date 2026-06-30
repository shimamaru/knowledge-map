export type Reference = {
  title: string;
  url: string;
  thumbnail: string;
};

export type FlowStep = {
  id: string;
  label: string;
  purpose: string;
  today: string;
  doneCondition: string;
  references?: Reference[];
};

export const flowSteps: FlowStep[] = [
  {
    id: "A",
    label: "困りごと: 何から手をつけていいかわからない",
    purpose: "今の自分の状態を一言で把握する",
    today: "「今困っていること」を1つだけ思い浮かべる",
    doneCondition: "困っていることを1つ言葉にできた",
    references: [
      {
        title: "（仮）困りごとの整理の仕方｜note",
        url: "https://note.com/example/n/example1",
        thumbnail: "https://placehold.jp/320x180.png?text=note",
      },
    ],
  },
  {
    id: "B",
    label: "紙にジャーナリング",
    purpose: "頭の中の渦巻きを紙に出して止める",
    today: "紙に「今困っていること」を3行で書く",
    doneCondition: "紙に3行書けている",
    references: [
      {
        title: "（仮）ジャーナリングのやり方｜YouTube",
        url: "https://www.youtube.com/watch?v=example2",
        thumbnail: "https://placehold.jp/320x180.png?text=YouTube",
      },
    ],
  },
  {
    id: "C",
    label: "ボイスメモで1分喋る",
    purpose: "頭の中を外に出す",
    today: "ボイスメモを開いて1分だけ喋る",
    doneCondition: "録音ファイルが1つできている",
    references: [
      {
        title: "（仮）ボイスメモ活用法｜YouTube",
        url: "https://www.youtube.com/watch?v=example3",
        thumbnail: "https://placehold.jp/320x180.png?text=YouTube",
      },
    ],
  },
  {
    id: "D",
    label: "Obsidianに素材化",
    purpose: "喋った内容を後から使える形で残す",
    today: "ボイスメモのファイルをObsidianのフォルダに置く（文字起こしできれば文字も）",
    doneCondition: "Obsidian内に今日のメモが1つ増えている",
    references: [
      {
        title: "（仮）Obsidianへの素材化フロー｜note",
        url: "https://note.com/example/n/example4",
        thumbnail: "https://placehold.jp/320x180.png?text=note",
      },
    ],
  },
  {
    id: "E",
    label: "Claudeに読ませて今日やることを1つ聞く",
    purpose: "迷う工程をなくし、やることを1つに絞る",
    today: "ClaudeにObsidianのメモを読ませて、今日やることを1つだけ聞く",
    doneCondition: "今日やることが1つに決まっている",
    references: [
      {
        title: "（仮）ClaudeにObsidianを読ませる方法｜YouTube",
        url: "https://www.youtube.com/watch?v=example5",
        thumbnail: "https://placehold.jp/320x180.png?text=YouTube",
      },
    ],
  },
  {
    id: "F",
    label: "それだけをやる",
    purpose: "決めたことを実行して、出力を積み重ねる",
    today: "決まった1つのことだけをやる。他は気にしない",
    doneCondition: "決めたことを実行した",
    references: [
      {
        title: "（仮）続けるコツ｜note",
        url: "https://note.com/example/n/example6",
        thumbnail: "https://placehold.jp/320x180.png?text=note",
      },
    ],
  },
];
