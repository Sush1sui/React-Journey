import React from "react";
import { ActionType } from "../Types";

type PropType = {
    dispatch: React.Dispatch<ActionType>;
    answer: number | null;
    index: number;
    numQuestions: number;
};
export default function NextButton({
    dispatch,
    answer,
    index,
    numQuestions,
}: PropType) {
    if (answer === null) return null;
    if (index < numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "nextQuestion" })}
            >
                Next
            </button>
        );

    if (index === numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "finished" })}
            >
                Finish
            </button>
        );
}
