import React from "react";

export default function Button({ children, handleClick }) {
    return (
        <button className="button" onClick={handleClick}>
            {children}
        </button>
    );
}
