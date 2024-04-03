import Head from "next/head";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyle";
import Layout from "@/components/layout";
import localFont from "next/font/local";

const moderat = localFont({
  src: [
    {
      path: "../assets/fonts/Moderat-Black-Italic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../assets/fonts/Moderat-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Moderat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <title>Cascade</title>
        <meta property="og:title" content="Cascade" key="title" />
      </Head>
      <div className={moderat.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}
