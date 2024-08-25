import React from "react";

type Props = {
    watchLength: number;
    avgImdbRating: number;
    avgUserRating: number;
    avgRuntime: number;
};

export default function Summary({
    watchLength,
    avgImdbRating,
    avgUserRating,
    avgRuntime,
}: Props) {
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watchLength} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}
