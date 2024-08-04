import React from "react";

export default function Count({
    count,
    handleCountMinus,
    handleCountPlus,
    handleCountChange,
}) {
    const handleChange = (e) => {
        handleCountChange(e);
    };
    return (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <button
                style={{ width: "50px", height: "40px", fontSize: "20px" }}
                onClick={() => handleCountMinus()}
            >
                -
            </button>
            <input type="text" value={count} onChange={handleCountChange} />
            <button
                style={{ width: "50px", height: "40px", fontSize: "20px" }}
                onClick={() => handleCountPlus()}
            >
                +
            </button>
        </div>
    );
}
