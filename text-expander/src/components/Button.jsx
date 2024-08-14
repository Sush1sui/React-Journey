import React from "react";

export default function Button({ color, handleToggle, children }) {
    return (
        <span
            role="button"
            style={{ cursor: "pointer", color: color }}
            onClick={handleToggle}
        >
            {children}
        </span>
    );
}
