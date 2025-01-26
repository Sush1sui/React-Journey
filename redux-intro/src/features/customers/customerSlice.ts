import { Reducer } from "redux";

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

const customerReducer: Reducer<InitialCustomerStateType, CustomerActionType> = (
  state: InitialCustomerStateType = initialStateCustomer,
  action: CustomerActionType
): InitialCustomerStateType => {
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
};

// ACTION CREATORS
export function createCustomer(
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

export function updateName(fullName: string): {
  type: "customer/updateName";
  payload: string;
} {
  return { type: "customer/updateName", payload: fullName };
}

export default customerReducer;
