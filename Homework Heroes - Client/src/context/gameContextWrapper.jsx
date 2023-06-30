import React, { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"

export const GameContext = createContext();

export default function GameContextWrapper({ children }) {
  const { id } = useParams()
  const [level, setLevel] = useState(1);

  const increaseLevel = () => {
    setLevel(level + 1);
  };

  useEffect(() => {
    async function fetchUserLevel() {
      try {
        const response = await axios.get(
          `https://homeworkhero-api.onrender.com/students/${id}`
        );
        const userLevel = response.data.level;
        setLevel(userLevel);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchUserLevel();
  }, []);

  return (
    <GameContext.Provider value={{ level, increaseLevel }}>
      {children}
    </GameContext.Provider>
  );
}