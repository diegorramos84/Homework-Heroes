import React, { useState, useEffect } from "react";
import { GreenContext, colours } from "./greenContext";

export default function GreenContextWrapper(props) {
  const [green, setGreen] = useState(colours.regular);

  function changeGreen(green) {
  setGreen(green)
  } 

  useEffect(() => {
   switch (green) {
    case colours.regular:
    document.body.classList.add('green-content');
    break;
    case colours.colour:
   default:
    document.body.classList.remove('green-content');
    break;
   }
  }, [green]);

  return (
    <GreenContext.Provider value={{ testing: green, changeGreen: changeGreen }}>
      {props.children}
    </GreenContext.Provider>
  );
};

