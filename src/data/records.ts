export type RecordItem = {
  media: string;
  title: string;
  date: string;
  tags: string[];
  url: string;
  description: string;
  detail: string;
  topic?: string;
};

export const records: RecordItem[] = [
  {
    media: "stand.fm",
    title: "夢診断とホロスコープで、自分の“抵抗感”を読む",
    date: "2026.07.01",
    tags: ["夢診断", "ホロスコープ", "自己理解", "就活", "生活設計", "AI活用"],
    url: "https://stand.fm/episodes/6a4478907390942dffa918f3",
    description: "夢診断とホロスコープを使って、無意識にある抵抗感や違和感を読む話。就活への抵抗、内面を雑に扱われる環境、生活設計の見直しについて。",
    detail: "",
  },
  {
    media: "stand.fm",
    title: "人当たりの良さは、呼吸から伝わる",
    date: "2026.06.30",
    tags: ["呼吸", "人間関係", "身体", "自律神経", "緊張", "安心感"],
    url: "https://stand.fm/episodes/6a3fd574ac08572069cbff13",
    description: "呼吸の速さ、首まわりの緊張、防衛反応が相手への安心感にどう伝わるか。身体を整えることと人間関係について。",
    detail: "",
  },
  {
    media: "stand.fm",
    title: "出会った人との相性は、翌朝の体が知っている",
    date: "2026.06.29",
    tags: ["人間関係", "相性", "直感", "身体", "記憶", "コミュニケーション"],
    url: "https://stand.fm/episodes/6a3fd1719f569ab24795b126",
    description: "人との相性や違和感を、その場のテンションではなく翌日の身体反応で見る話。記憶、呼吸、緊張、直感の扱いについて。",
    detail: "",
  },
];
