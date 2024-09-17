import { QuestionType } from "../Types";
import Options from "./Options";

type PropType = { question: QuestionType };

export default function Question({ question }: PropType) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options options={question.options} />
        </div>
    );
}
