import { readFileSync } from "fs";

export type MapNode = {
  id: string;
  label: string;
  children: MapNode[];
};

const VAULT_MAP_PATH =
  "/Users/shimataniyu/dev/My-vault/zettelkasten/_system/map.md";

function indentLevel(line: string): number {
  const match = line.match(/^(\s*)-\s/);
  if (!match) return -1;
  return match[1].length;
}

export function parseMapMarkdown(markdown: string): MapNode[] {
  const lines = markdown
    .split("\n")
    .filter((line) => indentLevel(line) >= 0);

  const root: MapNode[] = [];
  const stack: { node: MapNode; indent: number }[] = [];
  let counter = 0;

  for (const line of lines) {
    const indent = indentLevel(line);
    const label = line.replace(/^\s*-\s/, "").trim();
    const node: MapNode = { id: `N${counter++}`, label, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].node.children.push(node);
    }

    stack.push({ node, indent });
  }

  return root;
}

export function readMapTree(): MapNode[] {
  const markdown = readFileSync(VAULT_MAP_PATH, "utf-8");
  return parseMapMarkdown(markdown);
}

function escapeLabel(label: string): string {
  return label.replace(/"/g, "&quot;");
}

export function mapTreeToMermaid(tree: MapNode[]): string {
  const lines: string[] = ["flowchart TD"];
  const rootIds: string[] = [];

  function walk(node: MapNode, parentId: string | null) {
    lines.push(`  ${node.id}["${escapeLabel(node.label)}"]`);
    if (parentId) {
      lines.push(`  ${parentId} --> ${node.id}`);
    } else {
      rootIds.push(node.id);
    }
    for (const child of node.children) {
      walk(child, node.id);
    }
  }

  for (const node of tree) {
    walk(node, null);
  }

  lines.push(
    "  classDef step fill:#0a1622,stroke:#6a96b0,stroke-width:1.5px,color:#dfe7ec,rx:8,ry:8"
  );
  lines.push(
    "  classDef root fill:#0a1622,stroke:#a3c6d6,stroke-width:2px,color:#dfe7ec,rx:10,ry:10"
  );

  for (const rootId of rootIds) {
    lines.push(`  class ${rootId} root`);
  }

  return lines.join("\n");
}
