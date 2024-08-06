import React from "react";

export default function Button({ handleClick, children }) {
    return (
        <button
            style={{
                backgroundColor: "#7950f2",
                color: "white",
            }}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}
