import localFont from "next/font/local";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyle";

const moderat = localFont({
  src: "../assets/fonts/Moderat-Black-Italic.ttf",
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
