'use client';

import CascadeLogo from "@/components/CascadeLogo";
import { useRouter } from "next/router";
import Link from "next/link";
import noiseLight from "@/assets/images/noise-light.jpg";
import noiseImage from "@/assets/images/noise.png";
import { cn } from "@/lib/utils";

export default function Header({ isFromPage, isHomePage }) {
  const router = useRouter();
  const isAnimation = router.pathname === "/";

  return (
    <header
      className="sticky top-0 z-10 pt-4 md:pt-8"
      style={{
        backgroundImage: `url(${isAnimation ? noiseLight.src : noiseImage.src})`,
        backgroundColor: isHomePage ? "white" : "black",
      }}
    >
      <div className="flex items-end overflow-y-hidden pb-4 md:pb-8 md:grid">
        <Link
          href="/"
          className={cn(
            "mr-auto md:col-start-1 md:col-end-2",
            isAnimation && !isFromPage && "animate-fade-in-up"
          )}
        >
          <CascadeLogo color={isHomePage ? "black" : "white"} isAnimation={isAnimation} />
        </Link>
        <Link
          href="/expertise"
          className={cn(
            "mr-2 text-sm md:text-lg md:mr-0",
            isAnimation && !isFromPage && "animate-fade-in-up [--animation-delay:1.8s]"
          )}
        >
          Savoir-faire
        </Link>
        <Link
          href="/about"
          className={cn(
            "mr-2 text-sm md:text-lg md:mr-0",
            isAnimation && !isFromPage && "animate-fade-in-up [--animation-delay:1.9s]"
          )}
        >
          À propos
        </Link>
        <Link
          href="/contact"
          className={cn(
            "text-sm md:text-lg",
            isAnimation && !isFromPage && "animate-fade-in-up [--animation-delay:2s]"
          )}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
