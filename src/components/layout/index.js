import Header from "./header";
import Footer from "./footer";
import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "@/app/Context";
import { useRouter } from "next/router";

const StyledLayout = styled.div`
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$fontColor};
  transition: background-color 0.4s;
  min-height: 100vh;
`;

export default function Layout({ children }) {
  const { colors } = useContext(Context);
  const router = useRouter();

  const isCascade = router.pathname === "/" || "/contact";
  const isContact = router.pathname === "/contact";
  return (
    <StyledLayout $bgColor={colors.bgColor} $fontColor={colors.fontColor}>
      <Header bgColor={colors.bgColor} fontColor={colors.fontColor} />
      <main>{children}</main>
      <Footer colors={colors} isCascade={isCascade} isContact={isContact} />
    </StyledLayout>
  );
}
