import React, { act, useReducer, useState } from "react";

type Action =
    | { type: "inc"; payload: number }
    | { type: "dec"; payload: number }
    | { type: "setCount"; payload: number };

function reducer(state: number, action: Action) {
    console.log(state, action);
    if (action.type === "inc") return state + action.payload;
    if (action.type === "dec") return state - action.payload;
    if (action.type === "setCount") return action.payload;
    return state;
}

function DateCounter() {
    // const [count, setCount] = useState(0);
    const [count, dispatch] = useReducer(reducer, 0);
    const [step, setStep] = useState(1);

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({ type: "dec", payload: -1 });
        // setCount((count) => count - 1);
        // setCount((count) => count - step);
    };

    const inc = function () {
        dispatch({ type: "inc", payload: 1 });
        // setCount((count) => count + 1);
        // setCount((count) => count + step);
    };

    const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
        if (Number(e.target.value))
            dispatch({ type: "setCount", payload: Number(e.target.value) });
        // setCount(Number(e.target.value));
    };

    const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
        setStep(Number(e.target.value));
    };

    const reset = function () {
        // setCount(0);
        setStep(1);
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
