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

  useEffect(() => {
    setIsLines(true);
  }, [setIsLines]);

  return (
    <StyledContainer>
      {Array.from({ length: linesNb }, (e, i) => {
        return (
          <StyledLine
            $width={i + 1}
            $height={isLines ? "calc(20vh + " + Math.pow(i, 2.2) + "px)" : 0}
            $margin={linesNb - i}
            $delay={i * 0.1}
            key={i}
          ></StyledLine>
        );
      })}
    </StyledContainer>
  );
}
