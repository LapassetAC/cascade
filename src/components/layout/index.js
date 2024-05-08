import Header from "./header";
import Footer from "./footer";
import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "@/app/Context";
import noiseImage from "@/assets/images/noise.png";
import noiseLight from "@/assets/images/noise-light.jpg";

const StyledLayout = styled.div`
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$fontColor};
  min-height: 100vh;
  background-image: ${({ $pathname }) =>
    $pathname === "/" ? `url(${noiseLight.src})` : `url(${noiseImage.src})`};
`;

export default function Layout({ children, isFromPage, router }) {
  const { colors } = useContext(Context);
  const { pathname } = router;
  return (
    <StyledLayout
      $bgColor={colors.bgColor}
      $fontColor={colors.fontColor}
      $pathname={pathname}
    >
      <Header
        bgColor={colors.bgColor}
        fontColor={colors.fontColor}
        isFromPage={isFromPage}
      />
      <main>{children}</main>
      <Footer colors={colors} />
    </StyledLayout>
  );
}
