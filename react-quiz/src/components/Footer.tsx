import React from "react";

type PropType = {
    children: React.ReactNode;
};

export default function Footer({ children }: PropType) {
    return <footer>{children}</footer>;
}
