const CONTROL_CHARS = /[\u0000-\u001f\u007f]/g;

export const slugify = (value: string): string => {
  const normalized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(CONTROL_CHARS, "")
    .toLowerCase();

  const base = normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .trim();

  return base.length > 0 ? base : "image";
};
