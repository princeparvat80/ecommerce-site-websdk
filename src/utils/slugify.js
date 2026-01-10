export const slugify = (id, title) => {
  return `${id}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")}`;
};
