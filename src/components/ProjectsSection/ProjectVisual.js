import { useRef } from "react";
import Image from "next/image";
import { styled, css } from "styled-components";
import { textApparitionAnim, cascadeDelay } from "@/styles/theme";
import { useInView } from "react-intersection-observer";

const StyledContainer = styled.a`
  display: block;
  line-height: normal;
  ${({ $isFromPage }) =>
    !$isFromPage &&
    css`
      opacity: 0;
      visibility: hidden;
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
  priority,
}) {
  const projectRefs = useRef([]);
  const { title, image, url, videoUrl } = project;
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
    rootMargin: "150px 0px 150px 0px",
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
      <Image
        src={image.asset.url}
        ref={refImage}
        width={800}
        height={447}
        quality={85}
        alt={title}
        priority={priority}
      />
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
