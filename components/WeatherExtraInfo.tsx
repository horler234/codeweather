import { signOut, useSession } from "next-auth/client";
import styled from "styled-components";

const ExtraInfoWrapper = styled.div<{ isDescription?: boolean }>`
  margin-bottom: 30px;
  p {
    color: #c2c4cb;
    font-weight: 700;
    font-size: 12px;
  }

  h1 {
    color: #fff;
    font-size: 18px;
    ${(props) => props.isDescription && "text-transform: capitalize;"}
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

const LogoutButton = styled.button`
  background: transparent;
  font-family: inherit;
  color: #fff;
  cursor: pointer;
  border: none;
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
}: WeatherExtraInfoProps) => {
  const [session, loading] = useSession();
  return (
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
      <ExtraInfoWrapper isDescription>
        <p>Description</p>
        <h1>{desc}</h1>
      </ExtraInfoWrapper>

      {session && <LogoutButton onClick={() => signOut()}>Logout</LogoutButton>}
    </div>
  );
};
