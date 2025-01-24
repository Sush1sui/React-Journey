// TYPES
type AccountActionType =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { amount: number; loanPurpose: string };
    }
  | { type: "account/payLoan" };

// STATE
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(
  state = initialStateAccount,
  action: AccountActionType
) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

// ACTION CREATORS
export function deposit(amount: number): {
  type: "account/deposit";
  payload: number;
} {
  return { type: "account/deposit", payload: amount };
}
export function withdraw(amount: number): {
  type: "account/withdraw";
  payload: number;
} {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(
  amount: number,
  loanPurpose: string
): {
  type: "account/requestLoan";
  payload: { amount: number; loanPurpose: string };
} {
  return {
    type: "account/requestLoan",
    payload: { amount, loanPurpose },
  };
}
export function payLoan(): { type: "account/payLoan" } {
  return { type: "account/payLoan" };
}
