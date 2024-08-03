import React from "react";

export default function Pizza({ image, name, ingredient, price }) {
    return (
        <li className="pizza">
            <img src={image} alt={name} />
            <div>
                <h3>{name}</h3>
                <p>{ingredient}</p>
                <span>{price + 3}</span>
            </div>
        </li>
    );
}
