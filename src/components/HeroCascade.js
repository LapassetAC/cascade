import styled from "styled-components";
import { useState, useEffect } from "react";

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-column: 2 / 3;
  grid-row: 1 / 3;
`;
const StyledLine = styled.span`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height};
  margin-right: ${({ $margin }) => $margin}px;
  background-color: black;
  display: inline-block;
  transition: height 1s ease-out;
  transition-delay: ${({ $delay }) => $delay + "s" || "0s"};
`;

export default function HeroCascade() {
  const linesNb = 10;
  const [isLines, setIsLines] = useState(false);
  const [mouseHoverLineIndex, setMouseHoverLineIndex] = useState(0);

  useEffect(() => {
    setIsLines(true);
  }, [setIsLines]);

  return (
    <StyledContainer>
      {Array.from({ length: linesNb }, (e, i) => {
        let height = 0;
        let delay = i * 0.1;
        if (isLines) {
          height = "calc(20vh + " + Math.pow(i, 2.2) + "px)";
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
            $margin={linesNb - i}
            $delay={delay}
            onMouseOver={() => setMouseHoverLineIndex(i)}
            key={i}
          ></StyledLine>
        );
      })}
    </StyledContainer>
  );
}
