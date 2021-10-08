import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import Link from "next/link";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { useState } from "react";
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
} from "../components/page-styles/HomeStyles";

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

  const onChange = async (val: any) => {
    console.log(val);
    const test = await geocodeByPlaceId(val.value.place_id);
    console.log(test);
  };
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
            humidity={50}
            pressure={1009.483}
            windSpeed={1.4}
            desc="Clear Sky"
          />
        </TopWrapper>

        <WeatherTitle>
          <h1>16&#176;</h1>

          <LocationWrapper>
            <h2>London</h2>
            <p>06:09 - Monday, 9 Sep '19</p>
          </LocationWrapper>
        </WeatherTitle>
      </TitleSection>

      <WeatherDetailsWrapper>
        <AddressAutocomplete onChange={onChange} />

        <PreviousSearches>
          <li>
            <Link href="/">
              <a>Birmingham</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Birmingham</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Birmingham</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Birmingham</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Birmingham</a>
            </Link>
          </li>
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
