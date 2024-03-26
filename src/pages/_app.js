import localFont from "next/font/local";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyle";

const moderat = localFont({
  src: [
    {
      path: "../assets/fonts/Moderat-Black-Italic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../assets/fonts/Moderat-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Moderat-Medium.ttf",
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
      <main className={moderat.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
