import React, { useState } from "react";

export default function Form({ handleAddItem }) {
    const [formData, setFormData] = useState({ description: "", quantity: 1 });
    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            description: formData.description,
            quantity: formData.quantity,
            packed: false,
            id: Date.now(),
        };

        handleAddItem(newItem);
        setFormData({ description: "", quantity: 1 });
    };
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select
                value={formData.quantity}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        quantity: +e.target.value,
                    }))
                }
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={formData.description}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                    }))
                }
            />
            <button>Add</button>
        </form>
    );
}
