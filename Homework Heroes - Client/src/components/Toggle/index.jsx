import React, { useState, useContext } from "react";
import { ThemeContext, themes } from "../../context/themeContext";
import ToggleDark from '../ToggleDark'
import { GreenContext, colours } from "../../context/greenContext";
import "./style.css";

const Toggle = () => {
const { theme, changeTheme } = useContext(ThemeContext);
const { green, changeGreen } = useContext(GreenContext);
const [darkMode, setDarkMode] = useState(false);
const [greenMode, setGreenMode] = useState(false);

const toggleDark = () => {
  setDarkMode((prevDarkMode) => !prevDarkMode);
  setGreenMode((prevGreen) => !prevGreen);
  changeTheme(darkMode ? themes.light : themes.dark);
  changeGreen(greenMode ? colours.regular : colours.colour)
};

  return (
    <div className="toggle-container">
      <ToggleDark toggleDark={toggleDark} />
    </div>
  );
};

export default Toggle;