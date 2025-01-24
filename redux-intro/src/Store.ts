import { combineReducers, legacy_createStore as createStore } from "redux";

type AccountActionType =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { amount: number; loanPurpose: string };
    }
  | { type: "account/payLoan" };

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(
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

type CustomerActionType =
  | {
      type: "customer/createCustomer";
      payload: { fullName: string; nationalID: string; createdAt: string };
    }
  | { type: "customer/updateName"; payload: string };

function customerReducer(
  state = initialStateCustomer,
  action: CustomerActionType
) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

console.log(store);

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

function createCustomer(
  fullName: string,
  nationalID: string
): {
  type: "customer/createCustomer";
  payload: { fullName: string; nationalID: string; createdAt: string };
} {
  return {
    type: "customer/createCustomer",
    payload: { nationalID, fullName, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName: string): {
  type: "account/updateName";
  payload: string;
} {
  return { type: "account/updateName", payload: fullName };
}

store.dispatch(createCustomer("John Patrick Mercado", "2022315212"));
store.dispatch(deposit(250));
console.log(store.getState());
