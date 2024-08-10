import React, { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ handleAddFriend }) {
    const [formData, setFormData] = useState({
        name: "",
        image: "https://i.pravatar.cc/48",
    });

    const handleChange = (e, type) =>
        setFormData((prev) => ({ ...prev, [type]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.image) return;

        const id = crypto.randomUUID();
        const newFriend = {
            name: formData.name,
            image: `${formData.image}?=${id}`,
            balance: 0,
            id,
        };

        handleAddFriend(newFriend);

        setFormData({ name: "", image: "https://i.pravatar.cc/48" });
    };

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>🧑‍🤝‍🧑 Friend name</label>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange(e, "name")}
            />

            <label>🖼️ Image URL</label>
            <input
                type="text"
                value={formData.image}
                onChange={(e) => handleChange(e, "image")}
            />

            <Button>Add</Button>
        </form>
    );
}
