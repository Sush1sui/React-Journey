import React from "react";
import styles from "./Button.module.css";

type PropType = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: string;
};

export default function Button({ children, onClick, type }: PropType) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
