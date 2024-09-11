import { useEffect } from "react";

export function useKey(key: string, action: () => void) {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code.toLocaleLowerCase() === key.toLowerCase()) {
                action();
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [action, key]);
}
