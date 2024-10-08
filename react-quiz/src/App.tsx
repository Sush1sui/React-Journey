import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { ActionType, InitialStateType } from "./Types";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

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
                    state.points > state.highScore
                        ? state.points
                        : state.highScore,
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

function App() {
    const [
        {
            questions,
            status,
            index,
            answer,
            points,
            highScore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);
    const numQuestions = questions.length;
    const maxPoints = questions.reduce(
        (prev, curr) => prev + (curr.points || 0),
        0
    );

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

    return (
        <div className="app">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <ErrorComponent />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            i={index}
                            numQuestions={numQuestions}
                            points={points}
                            maxPoints={maxPoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                        </Footer>
                        <NextButton
                            dispatch={dispatch}
                            answer={answer}
                            index={index}
                            numQuestions={numQuestions}
                        />
                    </>
                )}
                {status === "finished" && (
                    <FinishedScreen
                        points={points}
                        maxPossiblePoints={maxPoints}
                        highScore={highScore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}

export default App;
