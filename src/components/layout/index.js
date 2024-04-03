import Header from "./header";
import Footer from "./footer";
import localFont from "next/font/local";

const moderat = localFont({
  src: [
    {
      path: "../../assets/fonts/Moderat-Black-Italic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../assets/fonts/Moderat-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Moderat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
