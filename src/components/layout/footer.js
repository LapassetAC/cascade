import styled, { css } from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import theme from "@/styles/theme";

const StyledFooter = styled.footer`
  padding-bottom: 30px;
  height: calc(100vh - ${theme.headerHeight}px);
  padding-bottom: 30px;
  font-size: 12px;
  @media ${({ theme }) => theme.minWidth.md} {
    font-size: 16px;
  }
  aside {
    grid-row: 1/2;
    background-color: ${({ $colors }) => $colors.fontColor};
    &:nth-child(1) {
      grid-column: 1 / 2;

      ${({ $progressInPercent, $noAnimation }) =>
        $noAnimation
          ? css`
              width: 44%;
              height: calc(13vh - ${theme.headerHeight + 30}px);
              min-height: 5px;
            `
          : css`
              width: ${$progressInPercent * 0.44}%;
              min-height: 5px;
              height: calc(
                ${$progressInPercent * 0.13}vh - ${theme.headerHeight + 30}px
              );
            `}
    }
    &:nth-child(2) {
      grid-column: 2 / 3;
      ${({ $progressInPercent, $noAnimation }) =>
        $noAnimation
          ? css`
              width: 56%;
              height: calc(36vh - ${theme.headerHeight + 30}px);
            `
          : css`
              width: ${$progressInPercent * 0.56}%;
              min-height: 5px;

              height: calc(
                ${$progressInPercent * 0.36}vh - ${theme.headerHeight + 30}px
              );
            `}
    }
    &:nth-child(3) {
      grid-column: 3 / 4;
      ${({ $progressInPercent, $noAnimation }) =>
        $noAnimation
          ? css`
              width: 67%;
              height: calc(72vh - ${theme.headerHeight + 30}px);
            `
          : css`
              width: ${$progressInPercent * 0.67}%;
              min-height: 5px;

              height: calc(
                ${$progressInPercent * 0.72}vh - ${theme.headerHeight + 30}px
              );
            `}
    }
    &:nth-child(4) {
      grid-column: 4 / 5;
      ${({ $progressInPercent, $noAnimation }) =>
        $noAnimation
          ? css`
              width: 78%;
              height: calc(90vh - ${theme.headerHeight + 30}px);
            `
          : css`
              width: ${$progressInPercent * 0.78}%;
              min-height: 5px;

              height: calc(
                ${$progressInPercent * 0.9}vh - ${theme.headerHeight + 30}px
              );
            `}
    }
    &:nth-child(5) {
      grid-column: 5 / 6;
      ${({ $progressInPercent, $noAnimation }) =>
        $noAnimation
          ? css`
              width: 89%;
              height: calc(99vh - ${theme.headerHeight + 30}px);
            `
          : css`
              width: ${$progressInPercent * 0.89}%;
              min-height: 5px;

              height: calc(
                ${$progressInPercent * 0.99}vh - ${theme.headerHeight + 30}px
              );
            `}
    }
    &:nth-child(6) {
      grid-column: 6 / 7;
      ${({ $progressInPercent, $noAnimation }) =>
        $noAnimation
          ? css`
              width: 100%;
              height: calc(100vh - ${theme.headerHeight + 30}px);
            `
          : css`
              width: ${$progressInPercent}%;
              min-height: 5px;

              height: calc(
                ${$progressInPercent}vh - ${theme.headerHeight + 30}px
              );
            `}
    }
  }
  div {
    grid-row: 1/2;
    align-self: self-end;
    color: ${({ $colors }) => $colors.fontColor};
    a {
      display: block;
      margin-top: 15px;
    }
    &:nth-of-type(1) {
      grid-column: 1 / 2;
    }
    &:nth-of-type(2) {
      grid-column: 2 / 3;
    }
    &:nth-of-type(3) {
      grid-column: 3 / 4;
    }
  }
`;

export default function Footer({ colors, noAnimation }) {
  const [progressInPercent, setProgressInPercent] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const top = ref.current.getBoundingClientRect().top;
      setProgressInPercent(
        Math.round(
          ((window.innerHeight - top) /
            (window.innerHeight - theme.headerHeight)) *
            100
        )
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledFooter
      className="grid"
      ref={ref}
      $progressInPercent={progressInPercent}
      $colors={colors}
      $noAnimation={noAnimation}
    >
      <aside></aside>
      <aside></aside>
      <aside></aside>
      <aside></aside>
      <aside></aside>
      <aside></aside>
      {/* <svg
        viewBox="0 0 1380 1012"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="91.9991" height="91.9991" fill="black" />
        <rect x="235.995" width="114.999" height="321.997" fill="black" />
        <rect x="470.984" width="137.999" height="689.993" fill="black" />
        <rect x="705.978" width="160.998" height="873.991" fill="black" />
        <rect x="941.01" width="183.998" height="965.991" fill="black" />
        <rect x="1173" width="206.998" height="1011.99" fill="black" />
      </svg> */}
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
    </StyledFooter>
  );
}
