import { useState } from "react";
import Button from "./components/Button";
import StepMessage from "./components/StepMessage";

function App() {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    const messages = [
        "Learn React ⚛️",
        "Apply for jobs 💼",
        "Invest your new income 🤑",
    ];

    const handlePrevious = () => {
        if (step > 1) {
            setStep((e) => e - 1);
        }
    };

    const handleNext = () => {
        if (step < 3) {
            setStep((e) => e + 1);
        }
    };

    return (
        <div>
            <button className="close" onClick={() => setIsOpen(!isOpen)}>
                &times;
            </button>
            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step === 1 && "active"}>1</div>
                        <div className={step === 2 && "active"}>2</div>
                        <div className={step === 3 && "active"}>3</div>
                    </div>

                    <StepMessage step={step}>{messages}</StepMessage>

                    <div className="buttons">
                        <Button
                            buttonText="Previous"
                            handleClick={handlePrevious}
                        >
                            <span>👈</span> Previous
                        </Button>
                        <Button buttonText="Next" handleClick={handleNext}>
                            Next <span>👉</span> <span>🤓</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
