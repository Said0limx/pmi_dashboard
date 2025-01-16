export const checkPathMatch = (href, pathname) => {
  let pathnameParts;
  if (pathname.length === 3) {
    pathnameParts = '/' + pathname.slice(3);
  } else {
    pathnameParts = pathname.slice(3);
  }
  const hrefParts = href;

  if (pathnameParts === hrefParts) {
    return true;
  }
  return false;
};
