import React, { useState, useContext } from "react";
import { GameContext } from '../../context/gameContextWrapper'
import Level1Badge from '../../assets/badges/Level-1.png';
import Level2Badge from '../../assets/badges/Level-2.png';
import Level3Badge from '../../assets/badges/Level-3.png';
import Level4Badge from '../../assets/badges/Level-4.png';
import './index.css'

const LevelBadge = () => {
  const { level } = useContext(GameContext);

  let imageSource;

  switch (level) {
    case 1:
      imageSource = Level1Badge;
      break;
    case 2:
      imageSource = Level2Badge;
      break;
    case 3:
      imageSource = Level3Badge;
      break;
    case 4:
      imageSource = Level4Badge;
      break;
    default:
      imageSource = Level1Badge;
  }

  return (
    <div className="level-container">
      <div>
      <h2 className="level-name">Level: {level}</h2>
      <img
        className="level-image"
        src={imageSource}
        alt={`Level ${level} Image`}
        height={100}
        width={100}
      />
      </div>
    </div>
  );
};

export default LevelBadge;
