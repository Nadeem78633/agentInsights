import React, { useState, useEffect } from "react";
import screenfull from "screenfull";
import { quiz } from "../data/quiz";
import "./quizApp.css";
import FullScreenBlocker from "./FullScreenBlocker";

const LOCAL_STORAGE_KEY = "quizState"; // Change the local storage key

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      return parsedState.activeQuestion || 0;
    }
    return 0;
  });

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      return parsedState.selectedAnswerIndex || null;
    }
    return null;
  });

  const [result, setResult] = useState(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      return (
        parsedState.result || { score: 0, correctAnswers: 0, wrongAnswers: 0 }
      );
    }
    return { score: 0, correctAnswers: 0, wrongAnswers: 0 };
  });

  const [quizStarted, setQuizStarted] = useState(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      return parsedState.quizStarted || false;
    }
    return false;
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      return parsedState.currentPage || "question";
    }
    return "question";
  });

  const [violations, setViolations] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  // Check if local storage is available
  const checkLocalStorageAvailability = () => {
    const testKey = "test";
    try {
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const isLocalStorageAvailable = checkLocalStorageAvailability();
    if (!isLocalStorageAvailable) {
      alert("Local storage is not available. Your progress won't be saved.");
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        activeQuestion,
        selectedAnswerIndex,
        result,
        quizStarted,
        currentPage,
      })
    );
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [activeQuestion, selectedAnswerIndex, result, quizStarted, currentPage]);

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswerIndex !== null &&
      choices[selectedAnswerIndex] === correctAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setCurrentPage("question");
    } else {
      setCurrentPage("result");
    }
  };

  const onAnswerSelected = (index) => {
    setSelectedAnswerIndex(index);
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const handleRetry = () => {
    checkFullScreen();
  };

  // Check if full-screen is enabled
  const checkFullScreen = () => {
    if (!screenfull.isEnabled) {
      alert("Fullscreen mode is not supported on this device/browser.");
    } else if (!screenfull.isFullscreen) {
      screenfull.request();
    } else {
      setIsFullScreen(true);
    }
  };

  // Check if the tab is active
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      setViolations((prev) => prev + 1);
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(screenfull.isFullscreen);
    };

    screenfull.on("change", handleFullScreenChange);

    return () => {
      screenfull.off("change", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const renderContent = () => {
    if (!quizStarted) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              checkFullScreen();
              setQuizStarted(true);
            }}
          >
            Start Quiz
          </button>
        </div>
      );
    }

    if (!isFullScreen && currentPage === "question") {
      return <FullScreenBlocker onRetry={handleRetry} />;
    }

    if (currentPage === "result") {
      return (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      );
    }

    return (
      <div>
        <div>
          <span className="active-question-no">
            {addLeadingZero(activeQuestion + 1)}
          </span>
          <span className="total-question">
            /{addLeadingZero(questions.length)}
          </span>
        </div>
        <h2>{question}</h2>
        <ul>
          {choices.map((answer, index) => (
            <li
              onClick={() => onAnswerSelected(index)}
              key={answer}
              className={selectedAnswerIndex === index ? "selected-answer" : ""}
            >
              {answer}
            </li>
          ))}
        </ul>
        <div className="flex-right">
          <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
            {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="quiz-container">
      {renderContent()}
      {quizStarted && (
        <div className="violations">
          Tab Violations: <span>{violations}</span>
        </div>
      )}
    </div>
  );
};

export default Quiz;
