import styled, { css, keyframes } from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import theme from "@/styles/theme";

const screenHeightWithoutHeader = `calc(100vh - 120px)`;

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
  height: ${screenHeightWithoutHeader};
  margin: 60px 30px 30px;

  @media ${({ theme }) => theme.minWidth.sm} {
    font-size: 16px;
    margin-top: 90px;
  }
  aside {
    grid-row: 1/2;
    width: 100%;
    background-color: ${({ theme }) => theme.color.black};

    view-timeline-name: --revealing-image;
    view-timeline-axis: block;
    animation-timeline: --revealing-image;
    animation-range: entry -20% cover calc(100vh - 90px);
    animation-fill-mode: both;
    animation-timing-function: linear;

    &:nth-of-type(1) {
      grid-column: 1 / 2;
      animation-name: ${drop1};
    }
    &:nth-of-type(2) {
      grid-column: 2 / 3;
      animation-name: ${drop2};
      animation-delay: 1s;
      animation-duration: 5s;
    }
    &:nth-of-type(3) {
      grid-column: 3 / 4;
      animation-name: ${drop3};
      animation-delay: 2s;
      animation-duration: 5s;
    }
    &:nth-of-type(4) {
      grid-column: 4 / 5;

      animation-name: ${drop4};
      animation-delay: 3s;
      animation-duration: 5s;
    }
    &:nth-of-type(5) {
      grid-column: 5 / 6;

      animation-name: ${drop5};
      animation-delay: 4s;
      animation-duration: 5s;
    }
    &:nth-of-type(6) {
      grid-column: 6 / 7;

      animation-name: ${drop6};
      animation-delay: 5s;
      animation-duration: 5s;
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
      margin-top: 15px;
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

export default function Footer({ colors, noAnimation }) {
  const [progressInPercent, setProgressInPercent] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledFooter className="grid" ref={ref} $colors={colors}>
      <aside></aside>
      <aside></aside>
      <aside></aside>
      <aside></aside>
      <aside></aside>
      <aside></aside>

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
