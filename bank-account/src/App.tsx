/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

import { useReducer } from "react";
import Balance from "./components/Balance";
import Button from "./components/Button";
import Loan from "./components/Loan";
import { ActionType, StateType } from "./Types";

const initialState = {
    balance: 0,
    loan: 0,
    active: false,
};

function reducer(state: StateType, action: ActionType): StateType {
    switch (action.type) {
        case "open-acc":
            return { ...state, balance: 500, active: true };
        case "deposit":
            return { ...state, balance: state.balance + 150 };
        case "withdraw":
            return {
                ...state,
                balance:
                    state.balance >= 50 ? state.balance - 50 : state.balance,
            };
        case "req-loan":
            const haveLoan = state.loan > 0;
            return {
                ...state,
                loan: haveLoan ? state.loan : 5000,
                balance: haveLoan ? state.balance : state.balance + 5000,
            };
        case "pay-loan":
            const loanPresent = state.loan > 0;
            return {
                ...state,
                balance: loanPresent
                    ? state.balance - state.loan
                    : state.balance,
                loan: loanPresent ? 0 : state.loan,
            };

        case "close-acc":
            const noLoan_and_zeroBalance =
                state.loan === 0 && state.balance === 0;

            return {
                ...state,
                active: noLoan_and_zeroBalance ? false : true,
            };
        default:
            return state;
    }
}

function App() {
    const [{ balance, loan, active }, dispatch] = useReducer(
        reducer,
        initialState
    );

    return (
        <div className="App">
            <h1>useReducer Bank Account</h1>
            <Balance balance={balance} />
            <Loan loan={loan} />

            <Button
                handleClick={() => dispatch({ type: "open-acc" })}
                isDisabled={active === false && true}
            >
                Open Account
            </Button>
            <Button
                handleClick={() => dispatch({ type: "deposit" })}
                isDisabled={active}
            >
                Deposit 150
            </Button>
            <Button
                handleClick={() => dispatch({ type: "withdraw" })}
                isDisabled={active}
            >
                Withdraw 50
            </Button>
            <Button
                handleClick={() => dispatch({ type: "req-loan" })}
                isDisabled={active}
            >
                Request a loan of 5000
            </Button>
            <Button
                handleClick={() => dispatch({ type: "pay-loan" })}
                isDisabled={active}
            >
                Pay Loan
            </Button>
            <Button
                handleClick={() => dispatch({ type: "close-acc" })}
                isDisabled={active}
            >
                Close account
            </Button>
        </div>
    );
}

export default App;
