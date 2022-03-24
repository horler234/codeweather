import styled from "styled-components";

/**
 * styles for the home page
 * @param imgSrc the background image rendered on the home page (to depend on city value)
 */

export const PageWrapper = styled.main<{ imgSrc?: string }>`
  background: linear-gradient(0deg, rgba(7, 6, 7, 0.4), rgba(7, 6, 7, 0.4)),
    url(${(props) => props.imgSrc ?? "/images/placeholder.jpeg"});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  @media (min-width: 768px) {
    width: 100vw;
    height: 100vh;
    padding-left: 7%;
    background-attachment: initial;
    display: flex;
    justify-content: space-between;
  }
`;

export const LogoLink = styled.div`
  a {
    text-decoration: none;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const WeatherDetailsWrapper = styled.section`
  background: rgba(7, 6, 7, 0.5);
  height: 100vh;
  backdrop-filter: blur(8px);
  padding: 10px 20px 20px;

  @media (min-width: 768px) {
    width: 40%;
    padding: 20px 50px;
    height: 100%;
  }
`;

export const PreviousSearches = styled.ul`
  padding: 40px 0;
  list-style: none;
  border-bottom: 1px solid #8f9094;
  margin-bottom: 20px;
  height: 260px;
  li {
    margin-bottom: 20px;
    font-size: 14px;
    color: #fff;
    button {
      font-size: 14px;
      color: #8f9094;
      text-decoration: none;
      cursor: pointer;
      background: none;
      border: none;
      font-family: inherit;
      &:hover {
        color: green;
      }
    }
  }

  li:last-child {
    margin-bottom: 0;
  }
`;

export const WeatherTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  h1 {
    font-family: 700;
    color: #fff;
    font-size: 30px;
  }

  @media (min-width: 768px) {
    padding-left: 0;
    h1 {
      font-size: 80px;
    }
  }
`;

export const UserNameText = styled.h4`
  color: #fff;
  padding-bottom: 40px;
  padding-left: 20px;
  text-transform: uppercase;
  font-size: 14px;

  @media (min-width: 768px) {
    padding-left: 0;
    padding-bottom: 100px;
    font-size: 16px;
  }
`;
export const TitleSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100%;

  @media (min-width: 768px) {
    width: 60%;
    padding-right: 7%;
    height: 100%;
  }
`;

export const LocationWrapper = styled.div`
  color: #fff;
  margin-left: 5px;
  h2 {
    font-size: 20px;
  }

  p {
    font-size: 12px;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 48px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 0;
  width: 100%;

  @media (min-width: 768px) {
    padding-top: 50px;
  }
`;
