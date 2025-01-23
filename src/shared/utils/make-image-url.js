export const makeImageUrl = (url) => {
  if (!url) {
    return '';
  }
  return process.env.NEXT_PUBLIC_API_URL + url;
};
