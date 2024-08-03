import React from "react";
import Pizza from "./Pizza";

export default function Menu() {
    return (
        <div className="menu">
            <h2>Our menu</h2>
            <Pizza
                name="Pizza Spinaci"
                ingredient="Tomato, mozarella, spinach, and ricotta cheese"
                image="pizzas/spinaci.jpg"
                price="10"
            />
            <Pizza
                name="Pizza Funghi"
                ingredient="Tomato, mushrooms"
                image="pizzas/funghi.jpg"
                price="10"
            />
        </div>
    );
}
