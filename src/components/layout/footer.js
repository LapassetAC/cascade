import styled, { css, keyframes } from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import theme from "@/styles/theme";

const drop1 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0px 0px 0);
	}
	to {
		opacity: 1;
		clip-path: inset(0 100px 100px 0);
	}
`;
const drop2 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0px 0px 0);
	}
	to {
		opacity: 1;
		clip-path: inset(0 100px 100px 0);
	}
`;
const drop3 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0px 0px 0);
	}
	to {
		opacity: 1;
		clip-path: inset(0 100px 100px 0);
	}
`;
const drop4 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0px 0px 0);
	}
	to {
		opacity: 1;
		clip-path: inset(0 100px 100px 0);
	}
`;
const drop5 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0px 0px 0);
	}
	to {
		opacity: 1;
		clip-path: inset(0 100px 100px 0);
	}
`;
const drop6 = keyframes`
	from {
		opacity: 0;
    clip-path: rect(0 0px 0px 0);
	}
	to {
		opacity: 1;
		clip-path: inset(0 100px 100px 0);
	}
`;

const StyledFooter = styled.footer`
  height: calc(100vh - 90px);
  aside {
    width: 100%;
    height: 300px;
    background-color: ${({ theme }) => theme.color.black};

    view-timeline-name: --revealing-image;
    view-timeline-axis: block;

    animation-timeline: --revealing-image;

    animation-range: entry 0% cover 100%;
    animation-direction: both;

    &:nth-of-type(1) {
      animation-name: ${drop1};
    }
    &:nth-of-type(2) {
      animation-name: ${drop2};
    }
    &:nth-of-type(3) {
      animation-name: ${drop3};
    }
    &:nth-of-type(4) {
      animation-name: ${drop4};
    }
    &:nth-of-type(5) {
      animation-name: ${drop5};
    }
    &:nth-of-type(6) {
      animation-name: ${drop6};
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
    <StyledFooter className="grid" ref={ref}>
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
