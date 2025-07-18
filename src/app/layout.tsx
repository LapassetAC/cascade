import type { Metadata } from "next";
import "@/styles/globals.css";
import { moderat } from "@/fonts";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Studio Cascade - Créateurs de sites web engageants",
  description:
    "Nous concevons des sites web uniques pour des marques inspirantes. Fidèles aux valeurs de nos clients, nos créations se distinguent par leur fluidité, leur performance et un référencement naturel (SEO) optimal.",
  verification: {
    google: "8lWpKFroE35oh-pXDm6WbRWgOjUlKS2R4drXYFPGLPY",
  },
  openGraph: {
    title: "Studio Cascade - Créateurs de sites web engageants",
    description:
      "Nous concevons des sites web uniques pour des marques inspirantes. Fidèles aux valeurs de nos clients, nos créations se distinguent par leur fluidité, leur performance et un référencement naturel (SEO) optimal.",
    type: "website",
    url: "https://cascadestudio.fr",
    images: [
      {
        url: "https://cascadestudio.fr/og.jpg",
        alt: "Cascade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Cascade - Créateurs de sites web engageants",
    description:
      "Nous concevons des sites web uniques pour des marques inspirantes. Fidèles aux valeurs de nos clients, nos créations se distinguent par leur fluidité, leur performance et un référencement naturel (SEO) optimal.",
    images: [
      {
        url: "https://cascadestudio.fr/og.jpg",
        alt: "Cascade",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${moderat.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
