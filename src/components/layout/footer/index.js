import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import JSFooterAnim from "./JSFooterAnim";
import noiseImage from "@/assets/images/noise.png";

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

const StyledFooter = styled.footer`
  display: grid !important;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  padding: 15px 0 !important;
  margin: 0 15px;
  background-color: ${({ $isCascade }) => !$isCascade && `transparent`};
  @media ${({ theme }) => theme.minWidth.sm} {
    background-image: url(${noiseImage.src});
    background-color: ${({ $isCascade, $isContact, theme }) =>
      $isCascade && !$isContact ? "" : theme.color.blue};
    position: ${({ $isCascade }) => !$isCascade && "fixed"};
    bottom: 0;
    padding: ${({ $isContact }) =>
      $isContact ? "0 0 30px !important" : "30px !important"};
    grid-gap: 30px;
    margin: 0 30px !important;
    left: 0;
    right: 0;
  }
  aside {
    display: ${({ $isCascade }) => ($isCascade ? "block" : "none")};
    height: calc(100vh - 150px);
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
          animation-delay: .1s;
          animation-duration: .5s;`}
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
          animation-delay: .2s;
          animation-duration: .5s;`}
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
          animation-delay: .3s;
          animation-duration: .5s;`}
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
          animation-delay: .4s;
          animation-duration: .5s;`}
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
      grid-column: 1 / 3;
      grid-row: 2/3;
      @media ${({ theme }) => theme.minWidth.sm} {
        grid-column: 1 / 2;
        grid-row: 1/2;
      }
    }
    &:nth-of-type(2) {
      grid-column: 3 / 5;
      grid-row: 2/3;
      @media ${({ theme }) => theme.minWidth.sm} {
        grid-column: 2 / 3;
        grid-row: 1/2;
      }
    }
    &:nth-of-type(3) {
      grid-column: 4 / 6;
      grid-row: 2/3;
      justify-self: end;
      @media ${({ theme }) => theme.minWidth.sm} {
        grid-column: 3 / 4;
        grid-row: 1/2;
        justify-self: start;
      }
    }
    .email-mobile {
      @media ${({ theme }) => theme.minWidth.md} {
        display: none;
      }
    }
    .email-desktop {
      display: none;
      @media ${({ theme }) => theme.minWidth.md} {
        display: block;
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

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/instagram")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  console.log(posts);

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
      {isScrollSupport || isContact ? (
        <>
          <aside></aside>
          <aside></aside>
          <aside></aside>
          <aside></aside>
          <aside></aside>
        </>
      ) : (
        isCascade && (
          <JSFooterAnim
            colors={colors}
            noAnimation={isContact}
            pathname={pathname}
          />
        )
      )}

      <div>
        <a href="mailto:contact@cascadestudio.fr">
          <div className="email-mobile">Nous écrire</div>
          <div className="email-desktop">contact@cascadestudio.fr</div>
        </a>
        <a href="tel:+33674626476">06 74 62 64 76</a>
      </div>
      <div>
        <a
          href="https://maps.app.goo.gl/ZN8LcTXYFRXWbsFMA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Marseille
        </a>
        <a
          href="https://maps.app.goo.gl/zRgt6fsaEa2tVu7BA"
          target="_blank"
          rel="noopener noreferrer"
        >
          La Jarjatte
        </a>
      </div>
      <div>
        <a
          href="https://www.linkedin.com/company/cascadestudio"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/le_studio_cascade/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </StyledFooter>
  );
}
