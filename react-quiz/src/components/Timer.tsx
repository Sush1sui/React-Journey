import React, { useEffect } from "react";
import { ActionType } from "../Types";

type PropType = {
    dispatch: React.Dispatch<ActionType>;
    secondsRemaining: number | null;
};

export default function Timer({ dispatch, secondsRemaining }: PropType) {
    const mins =
        secondsRemaining !== null ? Math.floor(secondsRemaining / 60) : null;
    const seconds = secondsRemaining !== null ? secondsRemaining % 60 : null;

    useEffect(
        function () {
            const id = setInterval(() => {
                dispatch({ type: "tick" });
            }, 1000);

            return () => clearInterval(id);
        },
        [dispatch]
    );

    return (
        <div className="timer">
            {mins !== null && mins < 10 && "0"}
            {mins !== null && mins}:{seconds !== null && seconds < 10 && "0"}
            {seconds !== null && seconds}
        </div>
    );
}
