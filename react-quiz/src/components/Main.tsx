import React from "react";

type ChildrenType = {
    children: React.ReactNode;
};

export default function Main({ children }: ChildrenType) {
    return <main className="main">{children}</main>;
}
