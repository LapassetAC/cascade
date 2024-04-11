import React, { createContext, useState, useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";
import { useRouter } from "next/router";

const Context = createContext();

const DataProvider = ({ children }) => {
  const router = useRouter();
  const theme = useContext(ThemeContext);
  const [colors, setColors] = useState({
    bgColor: theme.color.white,
    fontColor: theme.color.black,
  });

  useEffect(() => {
    if (router.pathname != "/") {
      setColors({ bgColor: theme.color.blue, fontColor: theme.color.white });
      const html = document.documentElement;
      html.style.backgroundColor = theme.color.blue;
    }
  }, []);

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
