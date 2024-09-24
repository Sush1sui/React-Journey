export interface StateType {
    balance: number;
    loan: number;
    active: boolean;
}

export type ActionType =
    | { type: "open-acc" }
    | { type: "deposit" }
    | { type: "withdraw" }
    | { type: "req-loan" }
    | { type: "pay-loan" }
    | { type: "close-acc" };
