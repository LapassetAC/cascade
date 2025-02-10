import localFont from "next/font/local";

export const moderat = localFont({
  src: [
    {
      path: "../public/fonts/Moderat-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Moderat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-moderat", // Optional: for CSS variable usage
  display: "swap", // Optional: ensures text remains visible during font load
  preload: true, // Optional: preloads the font files
});
