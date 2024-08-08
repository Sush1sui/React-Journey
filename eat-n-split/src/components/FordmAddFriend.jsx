import React from "react";
import Button from "./Button";

export default function FordmAddFriend() {
    return (
        <form className="form-add-friend">
            <label>🧑‍🤝‍🧑 Friend name</label>
            <input type="text" />

            <label>🖼️ Image URL</label>
            <input type="text" />

            <Button>Add</Button>
        </form>
    );
}
