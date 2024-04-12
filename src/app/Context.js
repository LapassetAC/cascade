import React, { createContext, useState, useContext, useEffect } from "react";
import theme from "@/styles/theme";
import { useRouter } from "next/router";

const Context = createContext();

const DataProvider = ({ children }) => {
  const router = useRouter();
  const white = theme.color.white;
  const black = theme.color.black;
  const blue = theme.color.blue;
  const [colors, setColors] = useState({
    bgColor: white,
    fontColor: black,
  });

  useEffect(() => {
    const html = document.documentElement;
    if (router.pathname === "/") {
      setColors({ bgColor: white, fontColor: black });
      html.style.backgroundColor = white;
    } else {
      setColors({ bgColor: blue, fontColor: white });
      html.style.backgroundColor = blue;
    }
  }, [router]);

  return (
    <Context.Provider
      value={{
        colors,
        setColors,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, DataProvider };
