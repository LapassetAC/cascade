import Head from "next/head";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyle";
import Layout from "@/components/layout";
import localFont from "next/font/local";
import { DataProvider } from "@/app/Context";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [isFromPage, setIsFromPage] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setIsFromPage(url === "/");
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DataProvider>
        <Head>
          <title>Cascade</title>
          <meta property="og:title" content="Cascade" key="title" />
        </Head>
        <div className={moderat.className}>
          <Layout isFromPage={isFromPage}>
            <Component {...pageProps} isFromPage={isFromPage} />
          </Layout>
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}
