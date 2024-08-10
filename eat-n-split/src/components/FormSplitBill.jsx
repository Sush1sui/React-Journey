import React, { useEffect, useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ friend, handleSplitBill }) {
    const [bill, setBill] = useState(0);
    const [paidByUser, setPaidByUser] = useState(0);
    const paidByFriend = bill ? bill - paidByUser : 0;
    const [whoIsPaying, setWhoIsPaying] = useState("user");

    useEffect(() => {
        setWhoIsPaying("user");
    }, [friend.name]);

    const checkIfNum = (input) => (!isNaN(input) ? +input : 0);
    const checkIfGreaterThanBill = (input) => {
        const payment = checkIfNum(input);
        return payment > bill ? paidByUser : payment;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!bill || !paidByUser) return;

        handleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
    };

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {friend.name}</h2>

            <label>💵 Bill value</label>
            <input
                type="text"
                value={!isNaN(bill) ? bill : null}
                onChange={(e) => setBill(checkIfNum(e.target.value))}
            />

            <label>🧍‍♂️ Your expense</label>
            <input
                type="text"
                value={paidByUser}
                onChange={(e) =>
                    setPaidByUser(checkIfGreaterThanBill(e.target.value))
                }
            />

            <label>🧑‍🤝‍🧑 {friend.name}'s expense</label>
            <input type="text" value={paidByFriend} disabled />

            <label>🤑 Who is paying the bill</label>
            <select
                value={whoIsPaying}
                onChange={(e) => setWhoIsPaying(e.target.value)}
            >
                <option value="user">You</option>
                <option value={friend.name}>{friend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    );
}
