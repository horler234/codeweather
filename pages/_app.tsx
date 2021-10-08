import App from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { NextComponentType, NextPageContext } from "next";
import { Provider } from "next-auth/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Custom Next.js App
 *
 * The App component is used to initialize pages,
 * it is the top level parent to all components.
 *
 * It is used to
 *  - inject global CSS for the html and body tags
 *  - pass the Theme to all styled-components
 *  - keep state between page navigation on the client
 */

/**
 * GlobalStyle: injects global CSS
 */

export interface ThemeWrapper {
  hasNoFocus: boolean;
}

const GlobalStyle = createGlobalStyle<ThemeWrapper>`
  html, body {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Oxygen', sans-serif;
    scroll-behavior: smooth;
  }

  * {
    margin: 0;
    padding: 0;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  ${(props) => props.hasNoFocus && ":focus { outline: none; }"}
`;

interface MyAppProps extends App {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  // State, used to keep track of outline or no outline around buttons, inputs, etc.
  const [hasNoFocus, setHasNoFocus] = useState(true);

  const router = useRouter();

  // If the user hits the 'tab' key, we want to add outlines back to focused elements for accessibility.
  const handleTabKeyPress = (evt: KeyboardEvent) => {
    if (evt.key === "Tab") setHasNoFocus(false);
  };

  // Add event listener to listen for 'tab' key.
  useEffect(() => {
    document.addEventListener("keydown", handleTabKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleTabKeyPress, false);
    };
  }, []);

  return (
    <Provider session={pageProps.session}>
      <GlobalStyle hasNoFocus={hasNoFocus} />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
