// TYPES
type CustomerActionType =
  | {
      type: "customer/createCustomer";
      payload: { fullName: string; nationalID: string; createdAt: string };
    }
  | { type: "customer/updateName"; payload: string };

// STATE
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(
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
  type: "account/updateName";
  payload: string;
} {
  return { type: "account/updateName", payload: fullName };
}
