import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

const StyledContainer = styled.div`
  .cascade {
    display: flex;
    justify-content: space-between;

    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }
  .text {
    grid-column: 3 / 5;
    grid-row: 1 / 3;
    height: fit-content;

    p {
      &:first-of-type {
        font-size: 48px;
        font-weight: 900;
        line-height: 52px;
        margin-bottom: 30px;
      }
    }
  }
`;
const StyledLine = styled.span`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background-color: black;
  display: inline-block;
  transition: height 1s ease-out;
  transition-delay: ${({ $delay }) => $delay + "s" || "0s"};
`;

export default function HeroSection() {
  const cascadeRef = useRef(0);
  const linesNb = 10;
  const [isLines, setIsLines] = useState(false);
  const [mouseHoverLineIndex, setMouseHoverLineIndex] = useState(null);
  const [cascadeHeight, setCascadeHeight] = useState(0);

  useEffect(() => {
    setIsLines(true);
    setCascadeHeight(cascadeRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCascadeHeight(cascadeRef.current.scrollHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <StyledContainer className="grid">
      <div className="cascade">
        {Array.from({ length: linesNb }, (e, i) => {
          let height = 0;
          let delay = i * 0.1;
          if (isLines) {
            height = cascadeHeight - Math.pow(linesNb - i + 1, 2.2);
            if (mouseHoverLineIndex === i) {
              height = 0;
              delay = 0;
            }
          } else {
            height = 0;
          }
          return (
            <StyledLine
              $width={i + 1}
              $height={height}
              $delay={delay}
              onMouseOver={() => setMouseHoverLineIndex(i)}
              key={i}
            ></StyledLine>
          );
        })}
      </div>
      <div ref={cascadeRef} className="text">
        <p>Revitalisez votre présence digitale</p>
        <p>
          Nous concevons des sites web engageants pour des marques engagées. Nos
          créations se distinguent par leur fluidité, leur respect de
          l'environnement, et leur optimisation pour le référencement naturel
          (SEO).
        </p>
      </div>
    </StyledContainer>
  );
}
