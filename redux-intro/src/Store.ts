import {
  combineReducers,
  legacy_createStore as createStore,
  Store,
} from "redux";
import accountReducer, {
  AccountActionType,
} from "./features/accounts/accountSlice";
import customerReducer, {
  CustomerActionType,
} from "./features/customers/customerSlice";

export type RootStateType = {
  account: {
    balance: number;
    loan: number;
    loanPurpose: string;
  };
  customer: {
    fullName: string;
    nationalID: string;
    createdAt: string;
  };
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store: Store<RootStateType, AccountActionType | CustomerActionType> =
  createStore(rootReducer);

export default store;
