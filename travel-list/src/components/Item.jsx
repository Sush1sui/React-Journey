import React from "react";

export default function Item({ description, quantity, packed }) {
    return (
        <li>
            <span style={packed ? { textDecoration: "line-through" } : {}}>
                {quantity} {description}
            </span>
            <button>❌</button>
        </li>
    );
}
