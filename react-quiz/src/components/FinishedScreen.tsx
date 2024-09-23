import React from "react";
import { ActionType, EmojiType } from "../Types";

type PropType = {
    points: number;
    maxPossiblePoints: number;
    highScore: number;
    dispatch: React.Dispatch<ActionType>;
};

export default function FinishedScreen({
    points,
    maxPossiblePoints,
    highScore,
    dispatch,
}: PropType) {
    const percentage = (points / maxPossiblePoints) * 100;

    let emoji: EmojiType = "🤦‍♂️";
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage > 0 && percentage < 50) emoji = "🤔";
    if (percentage === 0) emoji = "🤦‍♂️";

    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
                ({Math.ceil(percentage)}%)
            </p>

            <p className="highscore">
                (Highscore: {highScore} points {emoji})
            </p>

            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "restart" })}
            >
                Restart quiz
            </button>
        </>
    );
}
