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
          <title>Studio Cascade - Créateurs de sites web engageants</title>
          <meta
            property="og:title"
            content="Studio Cascade - Créateurs de sites web engageants"
            key="title"
          />
          <meta
            name="description"
            content="Nous concevons des sites web uniques pour des marques inspirantes. Fidèles aux valeurs de nos clients, nos créations se distinguent par leur fluidité, leur performance et un référencement naturel (SEO) optimal."
          />
          <meta
            name="og:description"
            content="Nous concevons des sites web uniques pour des marques inspirantes. Fidèles aux valeurs de nos clients, nos créations se distinguent par leur fluidité, leur performance et un référencement naturel (SEO) optimal."
          />
          <meta name="og:type" content="website" />
          <meta name="og:url" content="https://cascadestudio.fr" />
          <meta property="og:image" content="https://cascadestudio.fr/og.jpg" />
          <meta
            name="twitter:image"
            content="https://cascadestudio.fr/og.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Studio Cascade - Créateurs de sites web engageants"
          />
          <meta name="twitter:url" content="https://cascadestudio.fr" />
          <meta
            name="twitter:description"
            content="Nous concevons des sites web uniques pour des marques inspirantes. Fidèles aux valeurs de nos clients, nos créations se distinguent par leur fluidité, leur performance et un référencement naturel (SEO) optimal."
          />
          <meta property="og:image:alt" content="Cascade" />
          <meta property="twitter:image:alt" content="Cascade" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
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
