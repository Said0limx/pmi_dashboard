export const calculatePercent = (data, index) => {
  let percent = 0;
  const values = data[index];
  const isSelectedYearSmallerThanPrev = values.amount < values.prev_year_amount;
  if (isSelectedYearSmallerThanPrev) {
    percent = 100 - (values.amount / values.prev_year_amount) * 100;
  } else {
    percent = 100 - (values.prev_year_amount / values.amount) * 100;
  }
  return `${isSelectedYearSmallerThanPrev ? '-' : '+'}${percent.toFixed(1)}`;
};
