import React, { useState } from "react";

export default function Item({ num, title, currOpen, handleToggle, children }) {
    const isOpen = currOpen === num;
    return (
        <div
            className={`item${isOpen ? " open" : ""}`}
            onClick={() => handleToggle(num)}
        >
            <p className="number">{num + 1 < 9 ? `0${num + 1}` : num + 1}</p>
            <p className="title">{title}</p>
            <p className="icon">{isOpen ? "-" : "+"}</p>
            {isOpen && <div className="content-box">{children}</div>}
        </div>
    );
}
