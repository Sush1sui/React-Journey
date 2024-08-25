import React from "react";

type Props = {
    isOpen: boolean;
    toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
};

export default function Box({ isOpen, toggleOpen, children }: Props) {
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => toggleOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {children}
        </div>
    );
}
