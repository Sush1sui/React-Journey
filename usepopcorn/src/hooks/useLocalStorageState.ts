import { useEffect, useState } from "react";
import { WatchedData } from "../models/models";

export function useLocalStorageState(
    initialState: WatchedData[],
    key: string
): [WatchedData[], React.Dispatch<React.SetStateAction<WatchedData[]>>] {
    const [value, setValue] = useState<WatchedData[]>(function () {
        const storedValue = localStorage.getItem(key);
        if (storedValue) return JSON.parse(storedValue);
        return initialState;
    });

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}
