import Header from "./header";
import Footer from "./footer";
import localFont from "next/font/local";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
