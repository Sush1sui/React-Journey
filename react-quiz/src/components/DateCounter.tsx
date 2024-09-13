import React, { useReducer } from "react";

const initialState: StateType = { count: 0, step: 1 };

type Action =
    | { type: "inc"; payload: number }
    | { type: "dec"; payload: number }
    | { type: "setCount"; payload: number }
    | { type: "setStep"; payload: number }
    | { type: "reset" };

type StateType = { count: number; step: number };

function reducer(state: StateType, action: Action) {
    switch (action.type) {
        case "dec":
            return { ...state, count: state.count - state.step };
        case "inc":
            return { ...state, count: state.count + state.step };
        case "setCount":
            return { ...state, count: action.payload };
        case "setStep":
            return { ...state, step: action.payload };
        case "reset":
            return initialState;
        default:
            return state;
    }
}

function DateCounter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { count, step } = state;

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({ type: "dec", payload: step });
    };

    const inc = function () {
        dispatch({ type: "inc", payload: step });
    };

    const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
        if (Number(e.target.value))
            dispatch({ type: "setCount", payload: Number(e.target.value) });
    };

    const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
        if (Number(e.target.value))
            dispatch({ type: "setStep", payload: Number(e.target.value) });
    };

    const reset = function () {
        dispatch({ type: "reset" });
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
