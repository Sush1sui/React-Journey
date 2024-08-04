import { useState } from "react";
import Step from "./Step";
import Count from "./Count";
import Message from "./Message";

export default function Counter() {
    const [given, setGiven] = useState({ step: 1, count: 0 });
    const date = new Date("june 24 2024");
    date.setDate(date.getDate() + given.count);

    const handleStepChange = (e) => {
        setGiven((prev) => ({ ...prev, step: +e.target.value }));
    };

    const handleCountChange = (e) => {
        setGiven((prev) => ({ ...prev, count: +e.target.value }));
    };

    return (
        <div
            style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Step step={given.step} handleStepChange={handleStepChange} />
            <Count
                count={given.count}
                handleCountMinus={() =>
                    setGiven((prev) => ({
                        ...prev,
                        count: prev.count - prev.step,
                    }))
                }
                handleCountPlus={() =>
                    setGiven((prev) => ({
                        ...prev,
                        count: prev.count + prev.step,
                    }))
                }
                handleCountChange={handleCountChange}
            />
            <br />
            <Message
                count={given.count}
                date={date}
                handleReset={() => setGiven({ step: 1, count: 0 })}
            />
        </div>
    );
}
