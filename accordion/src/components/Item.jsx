import React, { useState } from "react";

export default function Item({ num, title, text }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`item${isOpen ? " open" : ""}`}
            onClick={() => setIsOpen((e) => !e)}
        >
            <p className="number">{num < 9 ? `0${num}` : num}</p>
            <p className="title">{title}</p>
            <p className="icon">{isOpen ? "-" : "+"}</p>
            {isOpen && <div className="content-box">{text}</div>}
        </div>
    );
}
