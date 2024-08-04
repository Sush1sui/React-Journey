import React from "react";
import Item from "./Item";

export default function PackagingList({ items }) {
    return (
        <ul className="list">
            {items.map((item) => (
                <Item
                    key={item.id}
                    description={item.description}
                    quantity={item.quantity}
                    packed={item.packed}
                />
            ))}
        </ul>
    );
}
