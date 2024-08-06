import React, { useState } from "react";
import Item from "./Item";

export default function Accordion({ faqs }) {
    const [currOpen, setCurrOpen] = useState(null);

    const handleToggle = (num) => {
        if (num === currOpen) setCurrOpen(null);
        else setCurrOpen(num);
    };

    return (
        <div className="accordion">
            {faqs.map((faq, i) => (
                <Item
                    key={i}
                    num={i}
                    title={faq.title}
                    currOpen={currOpen}
                    handleToggle={handleToggle}
                >
                    {faq.text}
                </Item>
            ))}
            <Item
                key="test 1"
                num={22}
                title="Test 1"
                currOpen={currOpen}
                handleToggle={handleToggle}
            >
                <p>Allows React developers to:</p>
                <ul>
                    <li>Break up UI into components</li>
                    <li>Make components reusable</li>
                    <li>Place state efficiently</li>
                </ul>
            </Item>
        </div>
    );
}
