import React from "react";
import { ActionType } from "../Types";

type PropType = { dispatch: React.Dispatch<ActionType>; answer: number | null };
export default function NextButton({ dispatch, answer }: PropType) {
    if (!answer) return null;
    return (
        <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
        >
            Next
        </button>
    );
}
