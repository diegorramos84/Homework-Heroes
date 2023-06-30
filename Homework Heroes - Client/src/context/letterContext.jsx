import { createContext } from "react";

export const lettering = {
  normal: "",
  bigger: "scaling-up",
};

export const LetteringContext = createContext({
  visual: lettering.bigger,
  changeFont: () => {},
});
