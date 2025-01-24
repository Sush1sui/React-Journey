import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import Customer from "./features/customers/Customer";
import CreateCustomer from "./features/customers/CreateCustomer";
import { useSelector } from "react-redux";
import { RootStateType } from "./Store";

function App() {
  const fullName = useSelector(
    (state: RootStateType) => state.customer.fullName
  );

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
