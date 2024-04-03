import React, { createContext, useState, useContext } from "react";
import { ThemeContext } from "styled-components";

const Context = createContext();

const DataProvider = ({ children }) => {
  const theme = useContext(ThemeContext);
  const [colors, setColors] = useState({
    bgColor: theme.color.white,
    fontColor: theme.color.black,
  });

  const changeColors = (bgColor, fontColor) => {
    setColors({ bgColor, fontColor });
  };

  return (
    <Context.Provider
      value={{
        colors,
        changeColors,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, DataProvider };
