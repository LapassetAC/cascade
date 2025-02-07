'use client';

import "@/styles/globals.css";
import Layout from "@/components/layout";
import Head from "next/head";

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Cascade - Développement web sur-mesure"
        />
        <title>Cascade - Développement web sur-mesure</title>
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
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
