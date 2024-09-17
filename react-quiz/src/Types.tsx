export type StateStatusType =
    | "loading"
    | "error"
    | "ready"
    | "active"
    | "finished";

export type QuestionType = {
    question: string;
    options: [string, string, string, string];
    correctOption: number;
    points: number;
};

export type InitialStateType = {
    questions: QuestionType[];
    status: StateStatusType;
    index: number;
};

export type ActionType =
    | {
          type: "dataReceived";
          payload: QuestionType[];
      }
    | { type: "dataFailed" }
    | { type: "start" };
