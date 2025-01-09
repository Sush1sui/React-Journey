import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

export default function Question() {
  const { index, questions, answer } = useQuiz();

  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options
        options={questions[index].options}
        answer={answer}
        correctOption={questions[index].correctOption}
      />
    </div>
  );
}
