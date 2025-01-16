export const getHeaderKey = (header) => {
  if (!header) return [];
  return header.category || header.problem || header.classification || [];
};
