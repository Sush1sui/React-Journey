import { legacy_createStore as createStore } from "redux";

type ActionType =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { amount: number; loanPurpose: string };
    }
  | { type: "account/payLoan" };

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action: ActionType) {
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

const store = createStore(reducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// const loanObject = { amount: 1000, loanPurpose: "Buy a car" };
// store.dispatch({
//   type: "account/requestLoan",
//   payload: loanObject,
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount: number): { type: "account/deposit"; payload: number } {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount: number): {
  type: "account/withdraw";
  payload: number;
} {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(
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
function payLoan(): { type: "account/payLoan" } {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
