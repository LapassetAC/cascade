import { Html, Head, Main, NextScript } from "next/document";
import { moderat } from "@/fonts";

export default function Document() {
  return (
    <Html lang="fr" className={`${moderat.variable} font-moderat`}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
