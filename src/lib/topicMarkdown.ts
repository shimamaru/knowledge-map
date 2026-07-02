import { readFileSync } from "fs";

export type TopicRecord = {
  title: string;
  media: string;
  date: string;
  tags: string[];
  url: string;
  description: string;
  detail: string;
};

export type TopicDetail = {
  title: string;
  description: string;
  records: TopicRecord[];
};

function parseFields(lines: string[]): Omit<TopicRecord, "title"> {
  const fields: Record<string, string> = {};
  let currentKey: string | null = null;

  for (const line of lines) {
    const indentedContinuation = line.match(/^\s{2,}(.*)$/);
    if (currentKey && indentedContinuation) {
      fields[currentKey] += ` ${indentedContinuation[1].trim()}`;
      continue;
    }

    const match = line.match(/^(\w+):\s*(.*)$/);
    if (!match) {
      currentKey = null;
      continue;
    }
    fields[match[1]] = match[2].trim();
    currentKey = match[1];
  }

  return {
    media: fields.media ?? "",
    date: fields.date ?? "",
    tags: fields.tags ? fields.tags.split(",").map((t) => t.trim()) : [],
    url: fields.url ?? "",
    description: fields.description ?? "",
    detail: fields.detail ?? "",
  };
}

export function parseTopicMarkdown(markdown: string): TopicDetail {
  const lines = markdown.split("\n");

  let title = "";
  let description = "";
  const records: TopicRecord[] = [];

  let currentTitle: string | null = null;
  let currentLines: string[] = [];

  const flush = () => {
    if (currentTitle !== null) {
      records.push({ title: currentTitle, ...parseFields(currentLines) });
    }
    currentTitle = null;
    currentLines = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      currentTitle = line.slice(3).trim();
      continue;
    }
    if (line.startsWith("# ")) {
      title = line.slice(2).trim();
      continue;
    }
    if (currentTitle !== null) {
      if (line.trim() !== "") currentLines.push(line);
    } else if (line.trim() !== "" && !description) {
      description = line.trim();
    }
  }
  flush();

  return { title, description, records };
}

export function readTopicDetail(slug: string): TopicDetail {
  const path = `/Users/shimataniyu/dev/My-vault/zettelkasten/_system/topics/${slug}.md`;
  const markdown = readFileSync(path, "utf-8");
  return parseTopicMarkdown(markdown);
}
