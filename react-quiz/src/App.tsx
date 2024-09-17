import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { ActionType, InitialStateType } from "./Types";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";

const initialState: InitialStateType = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
};

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

        default:
            throw new Error("Action unknown");
    }
}

function App() {
    const [{ questions, status, index, answer, points }, dispatch] = useReducer(
        reducer,
        initialState
    );
    const numQuestions = questions.length;

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
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <NextButton dispatch={dispatch} answer={answer} />
                    </>
                )}
            </Main>
        </div>
    );
}

export default App;
