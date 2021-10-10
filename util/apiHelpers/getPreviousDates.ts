export const getPreviousDates = (): Date[] => {
  const today = new Date();
  const day1 = new Date(today.valueOf() - 1000 * 60 * 60 * 24);
  const day2 = new Date(today.valueOf() - 1000 * 60 * 60 * 24 * 2);
  const day3 = new Date(today.valueOf() - 1000 * 60 * 60 * 24 * 3);
  const day4 = new Date(today.valueOf() - 1000 * 60 * 60 * 24 * 4);
  const day5 = new Date(today.valueOf() - 1000 * 60 * 60 * 24 * 5);

  return [day1, day2, day3, day4, day5];
};
