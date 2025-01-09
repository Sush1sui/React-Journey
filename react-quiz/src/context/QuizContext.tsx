import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  ActionType,
  InitialStateType,
  QuestionType,
  StateStatusType,
} from "../Types";

type QuizContextType = {
  questions: QuestionType[];
  status: StateStatusType;
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
  mins: number | null;
  seconds: number | null;
  numQuestions: number;
  maxPoints: number;
  startQuiz: () => void;
  newAnswer: (i: number) => void;
  nextQuestion: () => void;
  finish: () => void;
  restart: () => void;
};

const QuizContext = createContext<QuizContextType | null>(null);

const initialState: InitialStateType = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(
  state: InitialStateType,
  action: ActionType
): InitialStateType {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];

      if (question.points) {
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      }
      return state;
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining !== null
            ? state.secondsRemaining - 1
            : state.secondsRemaining,
        status:
          state.secondsRemaining !== null
            ? state.secondsRemaining <= 0
              ? "finished"
              : state.status
            : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (prev, curr) => prev + (curr.points || 0),
    0
  );

  const mins =
    secondsRemaining !== null ? Math.floor(secondsRemaining / 60) : null;
  const seconds = secondsRemaining !== null ? secondsRemaining % 60 : null;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:6969/questions");
        if (!res.ok) throw new Error("Error fetching questions data");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
        console.log(error);
      }
    }
    fetchQuestions();
  }, []);

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  function startQuiz() {
    dispatch({ type: "start" });
  }

  function newAnswer(i: number) {
    dispatch({ type: "newAnswer", payload: i });
  }

  function nextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function finish() {
    dispatch({ type: "finished" });
  }

  function restart() {
    dispatch({ type: "restart" });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        mins,
        seconds,
        numQuestions,
        maxPoints,
        startQuiz,
        newAnswer,
        nextQuestion,
        finish,
        restart,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");

  if (!context) throw new Error("QuizContext not found");

  return context;
}
