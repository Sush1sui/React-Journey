import { ActionType, QuestionType } from "../Types";
import Options from "./Options";

type PropType = {
    question: QuestionType;
    dispatch: React.Dispatch<ActionType>;
    answer: number | null;
};

export default function Question({ question, dispatch, answer }: PropType) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options
                options={question.options}
                dispatch={dispatch}
                answer={answer}
                correctOption={question.correctOption}
            />
        </div>
    );
}
