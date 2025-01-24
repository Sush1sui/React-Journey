import { useSelector } from "react-redux";
import { RootStateType } from "../../Store";

function Customer() {
  const customer = useSelector(
    (store: RootStateType) => store.customer.fullName
  );

  console.log(customer);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
