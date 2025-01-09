import { useQuiz } from "../context/QuizContext";

export default function StartScreen() {
  const { numQuestions, startQuiz } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={startQuiz}>
        Let's start
      </button>
    </div>
  );
}
