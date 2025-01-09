import { useQuiz } from "../context/QuizContext";

export default function Timer() {
  const { mins, seconds } = useQuiz();

  return (
    <div className="timer">
      {mins !== null && mins < 10 && "0"}
      {mins !== null && mins}:{seconds !== null && seconds < 10 && "0"}
      {seconds !== null && seconds}
    </div>
  );
}
