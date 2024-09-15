import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { ActionType, InitialStateType } from "./Types";

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

        default:
            throw new Error("Action unknown");
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

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
                <p>1/15</p>
                <p>Question?</p>
            </Main>
        </div>
    );
}

export default App;
