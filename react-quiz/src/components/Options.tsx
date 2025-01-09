import { useQuiz } from "../context/QuizContext";

type PropType = {
  options: [string, string, string, string];
  answer: number | null;
  correctOption: number;
};

export default function Options({ options, answer, correctOption }: PropType) {
  const { newAnswer } = useQuiz();

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
          onClick={() => newAnswer(i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
