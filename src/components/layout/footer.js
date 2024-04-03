import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

const StyledFooter = styled.footer`
  svg {
    grid-column: 1 / 8;
    grid-row: 1/2;
    width: 100%;
    rect {
      width: 0;
      &:nth-child(1) {
        width: ${({ $progressInPercent }) => $progressInPercent * 0.44 * 2}px;
      }
      &:nth-child(2) {
        width: ${({ $progressInPercent }) => $progressInPercent * 0.56 * 2}px;
      }
      &:nth-child(3) {
        width: ${({ $progressInPercent }) => $progressInPercent * 0.67 * 2}px;
      }
      &:nth-child(4) {
        width: ${({ $progressInPercent }) => $progressInPercent * 0.78 * 2}px;
      }
      &:nth-child(5) {
        width: ${({ $progressInPercent }) => $progressInPercent * 0.89 * 2}px;
      }
      &:nth-child(6) {
        width: ${({ $progressInPercent }) => $progressInPercent * 2}px;
      }
    }
  }
  div {
    grid-row: 1/2;
    grid-column: 1 / 8;
    align-self: self-end;
  }
`;

export default function Footer() {
  const [progressInPercent, setProgressInPercent] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const height = ref.current.clientHeight;
      const top = ref.current.getBoundingClientRect().top;
      const headerHeight = 86;
      setProgressInPercent(
        Math.round(((screen.height - top - headerHeight) / height) * 100)
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
    >
      <svg
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
      </svg>
      <div>
        <a href="">contact@cascade.fr</a>
        <a href="">+33 (0)6 74 62 64 76</a>
      </div>
      <div>
        <a href="">contact@cascade.fr</a>
        <a href="">+33 (0)6 74 62 64 76</a>
      </div>
      <div>
        <a href="">contact@cascade.fr</a>
        <a href="">+33 (0)6 74 62 64 76</a>
      </div>
    </StyledFooter>
  );
}
