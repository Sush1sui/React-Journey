import React from "react";

export default function Field({ children }) {
    return (
        <div>
            <p style={{ display: "flex", gap: "10px" }}>{children}</p>
        </div>
    );
}
