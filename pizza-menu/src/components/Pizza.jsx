import React from "react";

export default function Pizza({ image, name, ingredient, price, soldOut }) {
    return (
        <li className={`pizza ${soldOut && "sold-out"}`}>
            <img src={image} alt={name} />
            <div>
                <h3>{name}</h3>
                <p>{ingredient}</p>

                <span>{soldOut ? "SOLD OUT" : price}</span>
            </div>
        </li>
    );
}
