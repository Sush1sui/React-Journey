import { ActionType } from "../Types";

type PropType = {
    options: [string, string, string, string];
    dispatch: React.Dispatch<ActionType>;
    answer: number | null;
    correctOption: number;
};

export default function Options({
    options,
    dispatch,
    answer,
    correctOption,
}: PropType) {
    const hasAnswered = answer !== null;
    const answerResult = (i: number) => {
        return hasAnswered ? (i === correctOption ? "correct" : "wrong") : "";
    };
    return (
        <div className="options">
            {options.map((option, i) => (
                <button
                    key={i}
                    className={`btn btn-option ${
                        i === answer ? "answer" : ""
                    } ${answerResult(i)}`}
                    disabled={hasAnswered}
                    onClick={() => dispatch({ type: "newAnswer", payload: i })}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
