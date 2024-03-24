type Params = {
  query: string;
  target: string;
};

function normalizeString(str: string): string {
  // 半角カタカナを全角カタカナに、全角英数字を半角に変換し、カタカナをひらがなに変換
  return str
    .normalize('NFKC')
    .replace(/[\u30a1-\u30f6]/g, (match) => String.fromCharCode(match.charCodeAt(0) - 0x60))
    .toLowerCase();
}

export function isContains({ query, target }: Params): boolean {
  const normalizedQuery = normalizeString(query);
  const normalizedTarget = normalizeString(target);

  return normalizedTarget.includes(normalizedQuery);
}
