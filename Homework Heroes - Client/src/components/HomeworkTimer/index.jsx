import React, { useState, useEffect, useContext } from "react";
import GreenContextWrapper from "../../context/greenContextWrapper";
import LetteringContextWrapper from "../../context/letterContextWrapper"
import "./style.css";

const HomeworkTimer = () => {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Keep going, you got this",
    "Winners never quit!",
    "You can do anything you put your mind to.",
  ];

  useEffect(() => {
    let interval = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if ((prevTime - 1) % 30 === 0) {
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 5000);
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setShowMessage(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState);
  };

  const resetTimer = () => {
    setTime(1500);
    setIsRunning(false);
    setShowMessage(false);
  };

  const setTimerDuration = (duration) => {
    setIsRunning(false);
    resetTimer();

    let newTime;

    switch (duration) {
      case "homework":
        newTime = 1500;
        break;
      case "shortBreak":
        newTime = 300;
        break;
      case "longBreak":
        newTime = 900;
        break;
      default:
        newTime = 1500;
        break;
    }

    setTime(newTime);
  };

  return (
    <LetteringContextWrapper>
    <GreenContextWrapper>
      <div className="card-timer">
        <div className="card-content">
          <h3 className="title">Homework Timer</h3>
          <div className="timer-buttons">
            <button
              className="timer-button"
              onClick={() => setTimerDuration("homework")}
            >
              Start over
            </button>
            <button
              className="timer-button"
              onClick={() => setTimerDuration("shortBreak")}
            >
              Short Break
            </button>
            <button
              className="timer-button"
              onClick={() => setTimerDuration("longBreak")}
            >
              Long Break
            </button>
          </div>
          <div className="timer-container">{formatTime(time)}</div>
          <div className="timer-buttons">
            <button
              className={`timer-button ${isRunning ? "running" : ""}`}
              onClick={toggleTimer}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
            <button className="timer-button" onClick={resetTimer}>
              Reset
            </button>
          </div>
          {showMessage && (
            <div className="message-card">
              <p>{messages[messageIndex]}</p>
            </div>
          )}
        </div>
      </div>
    </GreenContextWrapper>
    </LetteringContextWrapper >
  );
};

export default HomeworkTimer;
