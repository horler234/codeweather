import axios from "axios";

export const getWeatherData = (city: string) => {
  const data = axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY as string
      }`
    )
    .then((res) => res)
    .catch((err) => console.log(err));

  return data;
};
