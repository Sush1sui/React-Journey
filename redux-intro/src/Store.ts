import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { AnyAction } from "redux";

// Combine reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Infer RootStateType from rootReducer
export type RootStateType = ReturnType<typeof rootReducer>;

// Define AppDispatch to support thunk
export type AppDispatch = ThunkDispatch<RootStateType, undefined, AnyAction>;

// Create the store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
