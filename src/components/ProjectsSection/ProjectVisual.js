import { useRef } from "react";
import Image from "next/image";
import { styled, css } from "styled-components";
import { textApparitionAnim, cascadeDelay } from "@/styles/theme";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../../sanity/lib/client";
import { useInView } from "react-intersection-observer";

const StyledContainer = styled.a`
  ${({ $isFromPage }) =>
    !$isFromPage &&
    css`
      opacity: 0;
      animation: ${textApparitionAnim} 0.4s forwards;
    `}
  ${cascadeDelay(6, 2.5)}
  position: relative;
  &:hover {
    cursor: pointer;
    video {
      @media ${(props) => props.theme.minWidth.sm} {
        transform: translateY(0px);
      }
    }
  }
  img {
    height: auto;
    width: 100%;
    aspect-ratio: 1.66;
  }
  .mask {
    top: 30px;
    left: 30px;
    right: 30px;
    bottom: 30px;
    position: absolute;
    &.mobile {
      display: block;
      @media ${({ theme }) => theme.minWidth.sm} {
        display: none;
      }
    }
    &.desktop {
      display: none;
      @media ${({ theme }) => theme.minWidth.sm} {
        display: block;
      }
    }
  }
  video {
    width: 100%;
    transition: transform 0.2s;
    @media ${(props) => props.theme.minWidth.sm} {
      transform: translateY(-101%);
    }
  }
`;

export default function ProjectVisual({
  project,
  isFromPage,
  isMobile,
  index,
  setCurrentProjectIndex,
}) {
  const projectRefs = useRef([]);
  const { title, image, url, videoUrl } = project;
  const imageProps = useNextSanityImage(client, image);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    !isMobile && videoRef.current.play();
  };
  const handleMouseLeave = () => {
    !isMobile && videoRef.current.pause();
  };

  const [refImage, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "250px 0px 250px 0px",
  });

  return (
    <StyledContainer
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      ref={(el) => (projectRefs.current[index] = el)}
      onMouseEnter={() => {
        handleMouseEnter();
        setCurrentProjectIndex(index);
      }}
      onMouseLeave={() => {
        handleMouseLeave();
        setCurrentProjectIndex(null);
      }}
      $isFromPage={isFromPage}
    >
      <Image ref={refImage} {...imageProps} alt={title} />
      <div className="mask mobile">
        {inView && (
          <video playsInline autoPlay loop muted>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {!isMobile && (
        <div className="mask desktop">
          <video ref={videoRef} preload="auto" playsInline loop muted>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </StyledContainer>
  );
}
