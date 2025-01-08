import React, { createContext, useContext, useReducer } from "react";

interface AuthContextType {
  user: object | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

type UserType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

type ReducerStateType = {
  user: UserType | null;
  isAuthenticated: boolean;
};

type ReducerActionType =
  | {
      type: "login";
      payload: UserType;
    }
  | { type: "logout" };

const initialState: ReducerStateType = {
  user: null,
  isAuthenticated: false,
};

function reducer(
  state: ReducerStateType,
  action: ReducerActionType
): ReducerStateType {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown Action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside PostProvider");

  if (!context) throw new Error("AuthContext not found");

  return context;
}
