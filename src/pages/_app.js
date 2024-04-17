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
          <meta
            name="description"
            content="Créateurs de sites web engageants."
          />
          <meta
            name="og:description"
            content="Créateurs de sites web engageants."
          />
          <meta name="og:type" content="website" />
          <meta name="og:url" content="https://cascadestudio.fr" />
          <meta
            property="og:image"
            content="https://cascadestudio.fr/logo.jpg"
          />
          <meta
            name="twitter:image"
            content="https://cascadestudio.fr/logo.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Cascade" />
          <meta name="twitter:url" content="https://cascadestudio.fr" />
          <meta
            name="twitter:description"
            content="Créateurs de sites web engageants."
          />
          <meta property="og:image:alt" content="Cascade" />
          <meta property="twitter:image:alt" content="Cascade" />
          <link rel="shortcut icon" href="/favicon.jpg" />
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
