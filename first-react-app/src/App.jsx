import { useEffect, useState } from "react";
import Message from "./Message";

function App() {
    const [count, setCount] = useState(0);
    const [advice, setAdvice] = useState("");

    useEffect(() => {
        getAdvice();
    }, []);

    const getAdvice = async () => {
        try {
            const res = await fetch("https://api.adviceslip.com/advice");
            const data = await res.json();
            setAdvice(data.slip.advice);
            setCount((c) => c + 1);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h1>{advice}</h1>
            <button onClick={getAdvice}>GET ADVICE</button>
            <Message count={count} />
        </>
    );
}

export default App;
