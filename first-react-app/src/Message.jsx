import React from "react";

export default function Message({ count }) {
    return (
        <p>
            You have read <b>{count}</b> piece{count > 1 && "s"} of advice
            {count > 1 && "s"}
        </p>
    );
}
