import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { RootStateType } from "../../Store";

// TYPES
type InitialAccountStateType = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};

// STATE
const initialStateAccount: InitialAccountStateType = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit(state, action) {
      state.balance += Math.abs(action.payload);
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= Math.abs(action.payload);
    },
    requestLoan: {
      prepare(amount: number, purpose: string) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action: { payload: { amount: number; purpose: string } }) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount: number, currency: string) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch: Dispatch, _getState: () => RootStateType) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;

// const accountReducer: Reducer<InitialAccountStateType, AccountActionType> = (
//   state: InitialAccountStateType = initialStateAccount,
//   action: AccountActionType
// ): InitialAccountStateType => {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };

//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };

//     case "account/requestLoan":
//       if (state.loan > 0) return state;

//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.amount,
//       };

//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };

//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// };

// // ACTION CREATORS
// export function deposit(amount: number, currency: string) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async function (dispatch: Dispatch, _getState: () => RootStateType) {
//     dispatch({ type: "account/convertingCurrency" });

//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;

//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }

// export function withdraw(amount: number): {
//   type: "account/withdraw";
//   payload: number;
// } {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(
//   amount: number,
//   loanPurpose: string
// ): {
//   type: "account/requestLoan";
//   payload: { amount: number; loanPurpose: string };
// } {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, loanPurpose },
//   };
// }

// export function payLoan(): { type: "account/payLoan" } {
//   return { type: "account/payLoan" };
// }

// export default accountReducer;
