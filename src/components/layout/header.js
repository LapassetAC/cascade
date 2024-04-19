import styled, { css } from "styled-components";
import CascadeLogo from "@/components/CascadeLogo";
import { textApparitionAnim, cascadeDelay } from "@/styles/theme";
import { useRouter } from "next/router";
import Link from "next/link";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: ${(props) => props.$bgColor};
  z-index: 1;
  padding: 15px 0 0;
  @media ${(props) => props.theme.minWidth.sm} {
    padding: 30px 0 0;
  }
  .animationMask {
    display: flex;
    align-items: end;
    overflow-y: hidden;
    padding: 0 0 15px;
    @media ${(props) => props.theme.minWidth.sm} {
      padding: 0 0 30px;
      display: grid;
    }
  }
  a {
    ${({ $isAnimation, $isFromPage }) =>
      $isAnimation &&
      !$isFromPage &&
      css`
        transform: translateY(-50px);
        animation: ${textApparitionAnim} 0.4s forwards;
      `};
    &.logo {
      margin-right: auto;
      @media ${(props) => props.theme.minWidth.sm} {
        grid-column: 1 / 3;
      }
    }
    &:not(.logo) {
      ${cascadeDelay(3, 1.8)}
    }
    margin-right: 7px;
    font-size: 14px;
    @media ${({ theme }) => theme.minWidth.sm} {
      margin-right: 0;
      font-size: 18px;
      line-height: 25px;
    }
    @media ${({ theme }) => theme.minWidth.md} {
      font-size: 22px;
      line-height: 30px;
    }
  }
`;

export default function Header({ bgColor, fontColor, isFromPage }) {
  const pathname = useRouter().pathname;
  const isAnimation = pathname === "/";
  return (
    <StyledHeader
      $bgColor={bgColor}
      $isAnimation={isAnimation}
      $isFromPage={isFromPage}
    >
      <div className="grid animationMask">
        <Link href="/" className="logo">
          <CascadeLogo color={fontColor} isAnimation={isAnimation} />
        </Link>
        <Link href="/expertise">Savoir-faire</Link>
        <Link href="/about">À propos</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </StyledHeader>
  );
}
