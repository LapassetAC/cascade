import styled, { keyframes, css } from "styled-components";
import { textApparitionAnim, cascadeDelay } from "@/styles/theme";
import { useState } from "react";

const cascadeAnim = keyframes`
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -88;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  /* &:hover > svg > line {
    animation: ${cascadeAnim} 0.4s
      ${({ theme }) => theme.cubicBezier.pageTranstion} infinite !important;
  } */
  h1 {
    font-weight: 900;
    font-size: 32px;
    line-height: 0.8em;
    ${({ $isAnimation }) =>
      $isAnimation &&
      css`
        animation: ${textApparitionAnim} 0.4s forwards;
        transform: translateY(-50px);
      `}
  }
  svg {
    height: 22px;
    position: relative;
    left: -12px;
    top: 8px;
    line {
      stroke-dasharray: 44;
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.4s ease-in-out;
      ${cascadeDelay(6, 0)}
      ${({ $isAnimation }) =>
        $isAnimation &&
        css`
          transform: translateY(-50px);
          animation: ${textApparitionAnim} 0.4s forwards;
        `}
    }
  }
`;

export default function CascadeLogo({ color, isAnimation }) {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  return (
    <StyledContainer
      onMouseOver={() => setIsLogoHovered(true)}
      $isLogoHovered={isLogoHovered}
      $isAnimation={isAnimation}
      // style={{ color: color }}
    >
      <h1>cascade</h1>
      <svg
        width="60"
        height="44"
        viewBox="0 0 60 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="2" x2="2" y2="4" stroke={color} strokeWidth="4" />
        <line x1="13.5" x2="13.5" y2="14" stroke={color} strokeWidth="5" />
        <line x1="24" x2="24" y2="30" stroke={color} strokeWidth="6" />
        <line x1="34.5" x2="34.5" y2="38" stroke={color} strokeWidth="7" />
        <line x1="45" x2="45" y2="42" stroke={color} strokeWidth="8" />
        <line x1="55.5" x2="55.5" y2="44" stroke={color} strokeWidth="9" />
      </svg>
    </StyledContainer>
  );
}
