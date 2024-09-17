import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { ActionType, InitialStateType } from "./Types";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState: InitialStateType = {
    questions: [],
    status: "loading",
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

        default:
            throw new Error("Action unknown");
    }
}

function App() {
    const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
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
                {status === "active" && <Question />}
            </Main>
        </div>
    );
}

export default App;
