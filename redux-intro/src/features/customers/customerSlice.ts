import { ActionType } from "../../Store";

// TYPES
export type CustomerActionType =
  | {
      type: "customer/createCustomer";
      payload: { fullName: string; nationalID: string; createdAt: string };
    }
  | { type: "customer/updateName"; payload: string };

export type InitialCustomerStateType = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};

// STATE
const initialStateCustomer: InitialCustomerStateType = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(
  state: InitialCustomerStateType = initialStateCustomer,
  action: CustomerActionType
): InitialCustomerStateType {
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

// ACTION CREATORS
export function createCustomer(
  fullName: string,
  nationalID: string
): ActionType<
  "customer/createCustomer",
  { fullName: string; nationalID: string; createdAt: string }
> {
  return {
    type: "customer/createCustomer",
    payload: { nationalID, fullName, createdAt: new Date().toISOString() },
  };
}

export function updateName(
  fullName: string
): ActionType<"customer/updateName", string> {
  return { type: "customer/updateName", payload: fullName };
}
