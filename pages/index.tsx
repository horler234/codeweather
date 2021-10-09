import Head from "next/head";
import Link from "next/link";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { AddressAutocomplete } from "../components/AddressAutocomplete";
import { WeatherExtraInfo } from "../components/WeatherExtraInfo";
import {
  PageWrapper,
  TitleSection,
  LogoLink,
  TopWrapper,
  WeatherTitle,
  LocationWrapper,
  WeatherDetailsWrapper,
  PreviousSearches,
  UserNameText,
} from "../components/page-styles/HomeStyles";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { SearchMongoose } from "../types/SearchMongoose";
import { getCityName } from "../util/apiHelpers/getCityName";
import { formatDateLong } from "../util/apiHelpers/formatDate";
import { getWeatherData } from "../util/apiHelpers/getWeatherData";

const data = {
  labels: ["1", "2", "3", "4", "5"],
  datasets: [
    {
      label: "Temperature",
      data: [12, 19, 3, 5, 2],
      fill: false,
      backgroundColor: "#8f9094",
      borderColor: "#8f9094",
    },
  ],
};

export default function Home() {
  const [value, setValue] = useState(null);
  const [session, loading] = useSession();
  const [searchHistory, setSearchHistory] = useState<SearchMongoose[] | null>(
    null
  );
  const [cityName, setCityName] = useState("Manchester");
  const [timeStamp, setTimeStamp] = useState(formatDateLong(new Date()));

  const [temp, setTemp] = useState<any>(null);
  const [pressure, setPressure] = useState<any>(null);
  const [humidity, setHumidity] = useState<any>(null);
  const [description, setDescription] = useState<any>(null);
  const [windSpeed, setWindSpeed] = useState<any>(null);

  // next router
  const router = useRouter();

  const onChange = async (val: any) => {
    console.log(val);
    const test = await geocodeByPlaceId(val.value.place_id);
    console.log(test);
    setCityName(getCityName(test));
    setTimeStamp(formatDateLong(new Date()));
  };
  if (session) {
    fetch(`/api/user/search/${session.user?.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((his) => setSearchHistory(his))
      .catch((err) => console.error(err));
  }

  const testFunction = () => {
    // const bodyTest =
    if (session) {
      fetch(`/api/user/search/${session.user?.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((his) => setSearchHistory(his))
        .catch((err) => console.error(err));
    }
  };

  const updateWeatherValues = (response: any) => {
    console.log(response);
    setTemp((response.data.main.temp - 273.15).toFixed(2));
    setPressure(response.data.main.pressure);
    setHumidity(response.data.main.humidity);
    setDescription(response.data.weather[0].description);
    setWindSpeed(response.data.wind.speed);
  };

  useEffect(() => {
    getWeatherData(cityName).then((res) => updateWeatherValues(res));
  }, [cityName]);

  return (
    <PageWrapper>
      <TitleSection>
        <TopWrapper>
          <LogoLink>
            <Link href="/">
              <a>code.weather</a>
            </Link>
          </LogoLink>

          <WeatherExtraInfo
            humidity={humidity}
            pressure={pressure}
            windSpeed={windSpeed}
            desc={description}
          />
        </TopWrapper>

        <div>
          <WeatherTitle>
            <h1>{temp}&#176;</h1>

            <LocationWrapper>
              <h2>{cityName}</h2>
              <p>{timeStamp}</p>
            </LocationWrapper>
          </WeatherTitle>
          <UserNameText>
            {session ? session.user?.name : "Not logged in"}
          </UserNameText>
        </div>
      </TitleSection>

      <WeatherDetailsWrapper>
        <AddressAutocomplete onChange={onChange} />

        <PreviousSearches>
          {session ? (
            searchHistory && searchHistory.length ? (
              searchHistory.map((search, i) => (
                <li key={i}>
                  <button>{search.city}</button>
                </li>
              ))
            ) : (
              <li>Start searching to view your history</li>
            )
          ) : (
            <li>
              <button onClick={() => router.push("/signin")}>Log In</button> to
              view your search history
            </li>
          )}
        </PreviousSearches>

        <Line
          data={data}
          height={250}
          options={{
            scales: {
              x: { grid: { display: false } },
              y: { grid: { display: false } },
            },
          }}
        />
      </WeatherDetailsWrapper>
    </PageWrapper>
  );
}
