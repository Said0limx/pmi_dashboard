export const createQueryString = (values) => {
  const params = new URLSearchParams();
  Object.keys(values).forEach((key) => {
    if (values[key]) {
      if (Array.isArray(values[key])) {
        if (values[key].length) params.append(key, values[key].join(','));
      } else params.append(key, values[key]);
    } else {
      params.delete(key);
    }
  });
  return params.toString();
};
