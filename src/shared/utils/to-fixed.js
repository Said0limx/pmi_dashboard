export const toFixed = (num, fixed = 1) => {
  if (num) {
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)?.[0];
  }
  return num;
};
