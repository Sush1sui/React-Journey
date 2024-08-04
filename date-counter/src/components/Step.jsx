import React from "react";

export default function Step({ step, handleStepChange }) {
    const handleChange = (e) => {
        handleStepChange(e);
    };
    return (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <input
                type="range"
                min={1}
                max={10}
                value={step}
                onChange={handleChange}
            />
            <p>{step}</p>
        </div>
    );
}
