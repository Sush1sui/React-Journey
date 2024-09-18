import React from "react";

type PropType = {
    i: number;
    numQuestions: number;
    points: number;
    maxPoints: number;
    answer: number | null;
};

export default function Progress({
    i,
    numQuestions,
    points,
    maxPoints,
    answer,
}: PropType) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={i + Number(answer !== null)} />

            <p>
                Question <strong>{i + 1}</strong> {numQuestions}
            </p>
            <p>
                <strong>{points}</strong> / {maxPoints}
            </p>
        </header>
    );
}
