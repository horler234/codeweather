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
import { getCityName } from "../util/apiHelpers/getCityName";
import { formatDateLong, formatDateShort } from "../util/apiHelpers/formatDate";
import { getWeatherData } from "../util/apiHelpers/getWeatherData";
import { getPreviousDates } from "../util/apiHelpers/getPreviousDates";
import {
  getCityImage,
  getLandScapeImage,
} from "../util/apiHelpers/getCityImage";

const data = {
  labels: formatDateShort(),
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
  // next-auth hook that returns authenticated user
  const [session, loading] = useSession();

  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const [cityName, setCityName] = useState("Lagos");
  const [cityImage, setCityImage] = useState(
    "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNjY0ODN8MHwxfHNlYXJjaHwyfHxsYWdvc3xlbnwwfHx8fDE2MzM4NTY5MDk&ixlib=rb-1.2.1&q=85"
  );
  const [timeStamp, setTimeStamp] = useState(formatDateLong(new Date()));

  const [temp, setTemp] = useState<any>(null);
  const [pressure, setPressure] = useState<any>(null);
  const [humidity, setHumidity] = useState<any>(null);
  const [description, setDescription] = useState<any>(null);
  const [windSpeed, setWindSpeed] = useState<any>(null);

  // next router
  const router = useRouter();

  const onChange = async (val: any) => {
    const test = await geocodeByPlaceId(val.value.place_id);

    const newHistory = [getCityName(test), ...searchHistory];
    if (session) setSearchHistory([newHistory]);

    setCityName(getCityName(test));
    setTimeStamp(formatDateLong(new Date()));
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
    if (session) {
      fetch(`/api/user/search/${session.user?.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((his) =>
          setSearchHistory(
            his.search.slice(Math.max(his.search.length - 5, 0)).reverse()
          )
        )
        .catch((err) => console.error(err));
    }
  });

  useEffect(() => {
    if (session) {
      fetch(`/api/user/search/${session.user?.email}`, {
        method: "POST",
        body: JSON.stringify(cityName),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => console.log(res.json()))
        .then((his: any) =>
          setSearchHistory(
            his.search.slice(Math.max(his.search.length - 5, 0)).reverse()
          )
        )
        .catch((err) => console.error(err));
    }
    getWeatherData(cityName).then((res) => updateWeatherValues(res));
    getCityImage(cityName).then((res) => {
      setCityImage(getLandScapeImage(res.data)[0]?.urls.regular);
    });
  }, [cityName]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="og:description"
          content="Code Weather is web application for displaying the weather data of a particular city."
        />
        <meta name="og:image" content="/images/placeholder.jpeg" />
        <meta property="og:site_name" content="Code Weather" />
        {/* twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home | Code Weather" />
        <meta
          name="twitter:description"
          content="Code Weather is web application for displaying the weather data of a particular city."
        />
        <meta name="twitter:image" content="/images/placeholder.jpeg" />
        <title>Home | Code Weather</title>
      </Head>
      <PageWrapper
        imgSrc={
          cityImage ??
          "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNjY0ODN8MHwxfHNlYXJjaHwyfHxsYWdvc3xlbnwwfHx8fDE2MzM4NTY5MDk&ixlib=rb-1.2.1&q=85"
        }
      >
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
                    <button onClick={() => setCityName(search)}>
                      {search}
                    </button>
                  </li>
                ))
              ) : (
                <li>Start searching to view your history</li>
              )
            ) : (
              <li>
                <button onClick={() => router.push("/signin")}>Log In</button>{" "}
                to view your search history
              </li>
            )}
          </PreviousSearches>

          {/* <Line
            data={data}
            height={250}
            options={{
              scales: {
                x: { grid: { display: false } },
                y: { grid: { display: false } },
              },
            }}
          /> */}
        </WeatherDetailsWrapper>
      </PageWrapper>
    </>
  );
}
