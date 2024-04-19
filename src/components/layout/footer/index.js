import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import JSFooterAnim from "./JSFooterAnim";

const drop1 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0% 0% 0);
	}
	to {
		opacity: 1;
		clip-path: rect(0 44% 13% 0);
	}
`;
const drop2 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0% 0% 0);
	}
	to {
		opacity: 1;
		clip-path: rect(0 56% 36% 0);
	}
`;
const drop3 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0% 0% 0);
	}
	to {
		opacity: 1;
		clip-path: rect(0 67% 72% 0);
	}
`;
const drop4 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0% 0% 0);
	}
	to {
		opacity: 1;
		clip-path: rect(0 78% 90% 0);
	}
`;
const drop5 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0% 0% 0);
	}
	to {
		opacity: 1;
		clip-path: rect(0 89% 99% 0);
	}
`;
const drop6 = keyframes`
	from {
    opacity: 0;
    clip-path: rect(0 0% 0% 0);
	}
	to {
    opacity: 1;
		clip-path: rect(0 100% 100% 0);
	}
`;

const StyledFooter = styled.footer`
  display: grid !important;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 15px;
  padding: 15px 0 !important;
  background-color: ${({ theme, $isCascade }) =>
    !$isCascade && theme.color.blue};
  @media ${({ theme }) => theme.minWidth.sm} {
    position: ${({ $isCascade }) => !$isCascade && "fixed"};
    bottom: 0;
    padding: ${({ $isContact }) =>
      $isContact ? "0 0 30px !important" : "30px 0 !important"};
    grid-gap: 30px;
    left: 0;
    right: 0;
  }
  aside {
    display: ${({ $isCascade }) => ($isCascade ? "block" : "none")};
    height: calc(100vh - 130px);
    grid-row: 1/2;
    width: 100%;
    background-color: ${({ $colors }) => $colors.fontColor};

    ${({ $isContact, theme }) =>
      $isContact
        ? `
        animation-timing-function: ${theme.cubicBezier.base};
        animation-fill-mode: forwards;
        opacity: 0;
        clip-path: rect(0 0% 0% 0);
        `
        : `
        view-timeline-name: --revealing-image;
        view-timeline-axis: block;
        animation-timeline: --revealing-image;
        animation-range: entry -20% cover calc(100vh - 90px);
        animation-fill-mode: both;
        animation-timing-function: linear;`}
    @media ${({ theme }) => theme.minWidth.sm} {
      height: calc(100vh - 120px);
    }
    &:nth-of-type(1) {
      grid-column: 1 / 2;
      animation-name: ${drop1};
      ${({ $isContact }) => $isContact && `animation-duration: .4s`};
    }
    &:nth-of-type(2) {
      grid-column: 2 / 3;
      animation-name: ${drop2};
      ${({ $isContact }) =>
        $isContact
          ? `
          animation-delay: .1s;
          animation-duration: .4s;
          `
          : `
          animation-delay: 1s;
          animation-duration: 5s;`}
    }
    &:nth-of-type(3) {
      grid-column: 3 / 4;
      animation-name: ${drop3};
      ${({ $isContact }) =>
        $isContact
          ? `
          animation-delay: .2s;
          animation-duration: .4s;
          `
          : `
          animation-delay: 2s;
          animation-duration: 5s;`}
    }
    &:nth-of-type(4) {
      grid-column: 4 / 5;
      animation-name: ${drop4};
      ${({ $isContact }) =>
        $isContact
          ? `
          animation-delay: .3s;
          animation-duration: .4s;
          `
          : `
          animation-delay: 3s;
          animation-duration: 5s;`}
    }
    &:nth-of-type(5) {
      grid-column: 5 / 6;
      animation-name: ${drop5};
      ${({ $isContact }) =>
        $isContact
          ? `
          animation-delay: .4s;
          animation-duration: .4s;
          `
          : `
          animation-delay: 4s;
          animation-duration: 5s;`}
    }
    &:nth-of-type(6) {
      grid-column: 6 / 7;
      animation-name: ${drop6};
      ${({ $isContact }) =>
        $isContact
          ? `
          animation-delay: .5s;
          animation-duration: .4s;
          `
          : `
          animation-delay: 5s;
          animation-duration: 5s;`}
    }
  }
  div {
    align-self: self-end;
    color: ${({ $colors }) => $colors.fontColor};
    @media ${({ theme }) => theme.minWidth.sm} {
      grid-row: 1/2;
    }
    a {
      display: block;
      &:nth-last-of-type(even) {
        margin-bottom: 15px;
      }
    }
    &:nth-of-type(1) {
      grid-column: 1 / 4;
      grid-row: 2/3;
      @media ${({ theme }) => theme.minWidth.sm} {
        grid-column: 1 / 2;
        grid-row: 1/2;
      }
    }
    &:nth-of-type(2) {
      grid-column: 4 / 6;
      grid-row: 2/3;
      @media ${({ theme }) => theme.minWidth.sm} {
        grid-column: 2 / 3;
        grid-row: 1/2;
      }
    }
    &:nth-of-type(3) {
      grid-column: 5 / 7;
      grid-row: 2/3;
      justify-self: end;
      @media ${({ theme }) => theme.minWidth.sm} {
        grid-column: 3 / 4;
        grid-row: 1/2;
        justify-self: start;
      }
    }
  }
`;

export default function Footer({ colors }) {
  const router = useRouter();
  const pathname = router.pathname;
  const isCascade = pathname === "/" || pathname === "/contact";
  const isContact = pathname === "/contact";
  const [isScrollSupport, setIsScrollSupport] = useState(false);

  useEffect(() => {
    setIsScrollSupport(CSS.supports("animation-timeline: scroll()"));
  }, []);

  return (
    <StyledFooter
      className="grid"
      $colors={colors}
      $isCascade={isCascade}
      $isContact={isContact}
    >
      {isScrollSupport ? (
        <>
          <aside></aside>
          <aside></aside>
          <aside></aside>
          <aside></aside>
          <aside></aside>
          <aside></aside>
        </>
      ) : (
        isCascade && <JSFooterAnim colors={colors} noAnimation={isContact} />
      )}

      <div>
        <a href="">contact@cascade.fr</a>
        <a href="">+33 (0)6 74 62 64 76</a>
      </div>
      <div>
        <a href="">Marseille</a>
        <a href="">La Jarjatte</a>
      </div>
      <div>
        <a href="">LinkedIn</a>
        <a href="">Twitter</a>
      </div>
      <Script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></Script>
    </StyledFooter>
  );
}
