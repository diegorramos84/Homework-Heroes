import React, { useContext, useState } from "react";
import { LetteringContext, lettering } from "../../context/letterContext";
import BigLettering from "../BigLettering";
import "./style.css";

const Lettering = () => {
  const { visual, changeFont } = useContext(LetteringContext);
  const [largerMode, setLargerMode] = useState(false);

  const toggleLarger = () => {
    setLargerMode((prevSizeMode) => !prevSizeMode);
    changeFont(largerMode ? lettering.bigger : lettering.normal);
  };

  return (
    <div className="lettering-toggle">
      <BigLettering toggleLarger={toggleLarger} />
    </div>
  );
};

export default Lettering;

