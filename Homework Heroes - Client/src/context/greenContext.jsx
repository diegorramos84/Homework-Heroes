import React, { createContext, useState } from "react";

export const colours = { 
    regular: "",
    colour: "green-content",
};

export const GreenContext = createContext({
    testing: colours.regular,
    changeGreen: () => {},
  });
  