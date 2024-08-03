import React from "react";

export default function Pizza({ image, name, ingredient, price }) {
    return (
        <div className="pizza">
            <img src={image} alt={name} />
            <div>
                <h3>{name}</h3>
                <p>{ingredient}</p>
                <span>{price}</span>
            </div>
        </div>
    );
}
