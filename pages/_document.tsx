import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

/**
 * Custom Next.js Document:
 *
 * Extends the default 'Document' to augment the applications <html> and <body> tags,
 * and to change the 'renderPage' method to ensure that Styled-Components work properly
 * with SSR.
 */

export default class MyDocument extends Document<any> {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
          enhanceComponent: (Component) => (props) =>
            sheet.collectStyles(<Component {...props} />),
        });

      const initialProps = await Document.getInitialProps(context);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <link
            rel="shortcut icon"
            href="/images/rain.png"
            type="image/x-icon"
          />
          <meta property="og:description" content="Weather App"></meta>
          <meta
            property="og:image"
            content="/public/images/placeholder.jpeg"
          ></meta>
          <meta name="theme-color" content="#0F0D0D" />
          <script
            type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`}
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
