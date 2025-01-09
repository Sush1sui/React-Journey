import { EmojiType } from "../Types";
import { useQuiz } from "../context/QuizContext";

export default function FinishedScreen() {
  const { points, maxPoints, highScore, restart } = useQuiz();

  const percentage = (points / maxPoints) * 100;

  let emoji: EmojiType = "🤦‍♂️";
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage > 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">
        (Highscore: {highScore} points {emoji})
      </p>

      <button className="btn btn-ui" onClick={restart}>
        Restart quiz
      </button>
    </>
  );
}
