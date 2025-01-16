export const checkPartOfPathname = (href, pathname) => {
  const pathnameParts = pathname.split('/').filter(Boolean);
  const hrefParts = href.split('/').filter(Boolean);
  const itemIndex = pathnameParts.findIndex((item) => item === hrefParts[0]);

  // Handle cases where lengths are different
  if (itemIndex < 0) {
    return false;
  }

  // Compare each segment except the language part (assuming it's the first segment)
  for (let i = 1; i < hrefParts.length; i++) {
    if (pathnameParts[i + itemIndex] !== hrefParts[i]) {
      return false;
    }
  }

  return true;
};
