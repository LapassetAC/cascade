import styled from "styled-components";
import { useEffect } from "react";

const StyledContainer = styled.div`
  h1 {
    font-weight: 900;
    font-size: 32px;
    &:hover > svg > line {
      stroke-dashoffset: -88;
    }
    svg {
      height: 22px;
      position: relative;
      left: -14px;
      top: 5px;
      line {
        stroke-dasharray: 44;
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 0.4s ease-in-out;
        &:nth-child(1) {
          transition-delay: 0.5s;
        }
        &:nth-child(2) {
          transition-delay: 0.4s;
        }
        &:nth-child(3) {
          transition-delay: 0.3s;
        }
        &:nth-child(4) {
          transition-delay: 0.2s;
        }
        &:nth-child(5) {
          transition-delay: 0.1s;
        }
      }
    }
  }
`;

export default function CascadeLogo() {
  useEffect(() => {}, []);

  return (
    <StyledContainer>
      <h1>
        cascade
        <svg
          width="60"
          height="44"
          viewBox="0 0 60 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="2" x2="2" y2="4" stroke="black" stroke-width="4" />
          <line x1="13.5" x2="13.5" y2="14" stroke="black" stroke-width="5" />
          <line x1="24" x2="24" y2="30" stroke="black" stroke-width="6" />
          <line x1="34.5" x2="34.5" y2="38" stroke="black" stroke-width="7" />
          <line x1="45" x2="45" y2="42" stroke="black" stroke-width="8" />
          <line x1="55.5" x2="55.5" y2="44" stroke="black" stroke-width="9" />
        </svg>
      </h1>
    </StyledContainer>
  );
}
