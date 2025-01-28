import { configureStore, Reducer } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Create the store
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

// Infer the `RootState` type from the store itself
export type RootStateType = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type for dispatching actions
export type AppDispatch = typeof store.dispatch;

export default store;
