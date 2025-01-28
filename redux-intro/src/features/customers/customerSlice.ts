import { createSlice } from "@reduxjs/toolkit";

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

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalID: string) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(
        state,
        action: {
          payload: { fullName: string; nationalID: string; createdAt: string };
        }
      ) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

// const customerReducer: Reducer<InitialCustomerStateType, CustomerActionType> = (
//   state: InitialCustomerStateType = initialStateCustomer,
//   action: CustomerActionType
// ): InitialCustomerStateType => {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };

//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// // ACTION CREATORS
// export function createCustomer(
//   fullName: string,
//   nationalID: string
// ): {
//   type: "customer/createCustomer";
//   payload: { fullName: string; nationalID: string; createdAt: string };
// } {
//   return {
//     type: "customer/createCustomer",
//     payload: { nationalID, fullName, createdAt: new Date().toISOString() },
//   };
// }

// export function updateName(fullName: string): {
//   type: "customer/updateName";
//   payload: string;
// } {
//   return { type: "customer/updateName", payload: fullName };
// }

// export default customerReducer;
