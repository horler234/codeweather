import styled from "styled-components";

const ExtraInfoWrapper = styled.div`
  margin-bottom: 30px;
  p {
    color: #c2c4cb;
    font-weight: 700;
    font-size: 12px;
  }

  h1 {
    color: #fff;
    font-size: 18px;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 24px;
    }

    p {
      font-size: 14px;
    }
  }
`;

type WeatherExtraInfoProps = {
  humidity: number;
  pressure: number;
  windSpeed: number;
  desc: string;
};

export const WeatherExtraInfo = ({
  humidity,
  pressure,
  windSpeed,
  desc,
}: WeatherExtraInfoProps) => (
  <div>
    <ExtraInfoWrapper>
      <p>Humidity</p>
      <h1>{humidity}%</h1>
    </ExtraInfoWrapper>
    <ExtraInfoWrapper>
      <p>Air Pressure</p>
      <h1>{pressure} PS</h1>
    </ExtraInfoWrapper>
    <ExtraInfoWrapper>
      <p>Wind Speed</p>
      <h1>{windSpeed}km/h</h1>
    </ExtraInfoWrapper>
    <ExtraInfoWrapper>
      <p>Description</p>
      <h1>{desc}</h1>
    </ExtraInfoWrapper>
  </div>
);
