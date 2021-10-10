import { getPreviousDates } from "./getPreviousDates";

// getUnixTime converts javascript date object to unix time to make API call to openweathermap

export const getUnixTime = (): number[] => {
  const unixArray = getPreviousDates().map((date) => date.getTime() / 1000);

  return unixArray;
};
