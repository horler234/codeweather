import { getPreviousDates } from "./getPreviousDates";

const formatLessNumber = (val: number): string => {
  if (val < 10) return `0${val}`;

  return `${val}`;
};

export const formatDateLong = (date: Date): string => {
  const hour = formatLessNumber(date.getHours());
  const min = formatLessNumber(date.getMinutes());
  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.toLocaleString("en-US", { year: "2-digit" });

  return `${hour}:${min} - ${weekday}, ${day} ${month} '${year}`;
};

export const formatDateShort = (): string[] => {
  return getPreviousDates().map((date) => {
    const day = date.toLocaleString("en-US", { day: "numeric" });
    const month = date.toLocaleString("en-US", { month: "numeric" });
    return `${day}/${month}`;
  });
};
