import React from "react";
import { ActionType } from "../Types";

type PropType = { numQuestions: number; dispatch: React.Dispatch<ActionType> };

export default function StartScreen({ numQuestions, dispatch }: PropType) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} question to test your React mastery</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "start" })}
            >
                Let's start
            </button>
        </div>
    );
}
