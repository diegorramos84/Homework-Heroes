import React, { useState, useEffect } from 'react';
import { LetteringContext, lettering } from "../context/letterContext";

export default function LetteringContextWrapper({ children }) {
  const [visual, setVisual] = useState(lettering.bigger);

  function changeFont(visual) {
    setVisual(visual);
  }

  useEffect(() => {
    switch (visual) {
      case lettering.bigger:
        document.body.classList.add('scaling-up');
        break;
      case lettering.normal:
        document.body.classList.remove('scaling-up');
        break;
    }
  }, [visual]);

  return (
    <LetteringContext.Provider value={{ visual: visual, changeFont: changeFont }}>
      {children}
    </LetteringContext.Provider>
  );
}

