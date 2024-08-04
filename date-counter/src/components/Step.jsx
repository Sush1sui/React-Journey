import React from "react";

export default function Step({ step, handleStepMinus, handleStepPlus }) {
    return (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <button
                style={{ width: "50px", height: "40px", fontSize: "20px" }}
                onClick={() => handleStepMinus()}
            >
                -
            </button>
            <p>Step: {step}</p>
            <button
                style={{ width: "50px", height: "40px", fontSize: "20px" }}
                onClick={() => handleStepPlus()}
            >
                +
            </button>
        </div>
    );
}
