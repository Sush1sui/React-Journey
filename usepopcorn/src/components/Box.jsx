import React from "react";

export default function Box({ isOpen, toggleOpen, children }) {
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => toggleOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {children}
        </div>
    );
}
