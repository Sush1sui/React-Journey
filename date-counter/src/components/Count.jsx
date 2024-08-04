import React from "react";

export default function Count({ count, handleCountMinus, handleCountPlus }) {
    return (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <button
                style={{ width: "50px", height: "40px", fontSize: "20px" }}
                onClick={() => handleCountMinus()}
            >
                -
            </button>
            <p>Count: {count}</p>
            <button
                style={{ width: "50px", height: "40px", fontSize: "20px" }}
                onClick={() => handleCountPlus()}
            >
                +
            </button>
        </div>
    );
}
