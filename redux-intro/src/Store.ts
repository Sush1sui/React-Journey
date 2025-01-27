import { configureStore, Reducer } from "@reduxjs/toolkit";
import accountReducer, {
  AccountActionType,
  InitialAccountStateType,
} from "./features/accounts/accountSlice";
import customerReducer, {
  CustomerActionType,
  InitialCustomerStateType,
} from "./features/customers/customerSlice";

export type RootStateType = {
  account: Reducer<InitialAccountStateType, AccountActionType>;
  customer: Reducer<InitialCustomerStateType, CustomerActionType>;
};

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
