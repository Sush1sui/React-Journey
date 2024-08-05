import React from "react";

export default function Item({
    id,
    description,
    quantity,
    packed,
    handleDeleteItem,
    handleToggleItem,
}) {
    return (
        <li>
            <input
                type="checkbox"
                checked={packed}
                onChange={() => handleToggleItem(id)}
            />
            <span style={packed ? { textDecoration: "line-through" } : {}}>
                {quantity} {description}
            </span>
            <button onClick={() => handleDeleteItem(id)}>❌</button>
        </li>
    );
}
