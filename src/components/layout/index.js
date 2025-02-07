'use client';

import Header from "./header";
import Footer from "./footer";
import React from "react";
import noiseImage from "@/assets/images/noise.png";
import noiseLight from "@/assets/images/noise-light.jpg";
import { cn } from "@/lib/utils";

export default function Layout({ children, isFromPage, router }) {
  const { pathname } = router;
  const isHomePage = pathname === "/";
  
  return (
    <div
      className={cn(
        "min-h-screen",
        isHomePage ? "bg-white text-black" : "bg-black text-white"
      )}
      style={{
        backgroundImage: `url(${isHomePage ? noiseLight.src : noiseImage.src})`,
      }}
    >
      <Header isFromPage={isFromPage} isHomePage={isHomePage} />
      <main>{children}</main>
      <Footer isHomePage={isHomePage} />
    </div>
  );
}
