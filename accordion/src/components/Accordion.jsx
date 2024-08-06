import React from "react";
import Item from "./Item";

export default function Accordion({ faqs }) {
    return (
        <div className="accordion">
            {faqs.map((faq, i) => (
                <Item key={i} num={i + 1} title={faq.title} text={faq.text} />
            ))}
        </div>
    );
}
