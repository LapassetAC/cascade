import styled from "styled-components";
import CascadeLogo from "@/components/CascadeLogo";
import { textApparitionAnim, cascadeDelay } from "@/styles/theme";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: ${(props) => props.$bgColor};
  transition: background-color 0.4s;
  z-index: 1;
  padding: 30px 0 0;

  .animationMask {
    padding: 0 0 30px;
    align-items: end;
    overflow-y: hidden;
  }
  a {
    transform: translateY(-50px);
    animation: ${textApparitionAnim} 0.4s forwards;
    &.logo {
      grid-column: 1 / 3;
    }
    &:not(.logo) {
      ${cascadeDelay(4, 2)}
    }
  }
`;

export default function Header({ bgColor, fontColor }) {
  return (
    <StyledHeader $bgColor={bgColor}>
      <div className="grid animationMask">
        <a href="/" className="logo">
          <CascadeLogo color={fontColor} />
        </a>
        <a href="/expertise">Savoir-faire</a>
        <a href="/about">À propos</a>
        <a href="/contact">Contact</a>
      </div>
    </StyledHeader>
  );
}
