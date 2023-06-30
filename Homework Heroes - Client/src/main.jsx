import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";

import ThemeContextWrapper from "./context/themeContextWrapper.jsx";
import LetteringContextWrapper from "./context/letterContextWrapper.jsx";
import GreenContextWrapper from "./context/greenContextWrapper.jsx";
import BurgerNavWrapper from "./context/BurgerNavigation/burgerNavWrapper.jsx";

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <ToastContainer />
  <BurgerNavWrapper>
    <LetteringContextWrapper>
        <ThemeContextWrapper>
          <BrowserRouter>
            <DndProvider backend={HTML5Backend}>
              <App />
            </DndProvider>
          </BrowserRouter>
        </ThemeContextWrapper>
    </LetteringContextWrapper>
  </BurgerNavWrapper>
  </Provider>
);
