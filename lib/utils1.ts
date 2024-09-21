export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export function convertDocToObj(doc: any) {
  doc._id = doc._id.toString();
  return doc;
}

export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatId = (x: string) => {
  return `..${x.substring(20, 24)}`;
};

export function formatCategoryName(category: string): string {
  return category
    .split("-")
    .map((word) =>
      word.toLowerCase() === "and"
        ? "and"
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}
