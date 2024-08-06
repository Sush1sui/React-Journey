import { useState } from "react";
import Field from "./components/Field";
import Footer from "./components/Footer";
import Satisfaction from "./components/Satisfaction";
import Bill from "./components/Bill";

function App() {
    const [totalPayment, setTotalPayment] = useState({
        bill: 0,
        yourTip: 0,
        friendTip: 0,
    });

    const handleChange = (e, type) =>
        setTotalPayment((prev) => ({
            ...prev,
            [type]:
                isNaN(Number(e.target.value)) === false
                    ? Number(e.target.value)
                    : 0,
        }));

    return (
        <div>
            <Field>
                <span>How much was the bill?</span>
                <span>
                    <Bill
                        bill={totalPayment.bill}
                        handleChange={(e) => handleChange(e, "bill")}
                    />
                </span>
            </Field>
            <Field>
                <span>How did you like the service?</span>
                <span>
                    <Satisfaction
                        tip={totalPayment.yourTip}
                        handleChange={(e) => handleChange(e, "yourTip")}
                    />
                </span>
            </Field>
            <Field>
                <span>How did your friend like the service?</span>
                <span>
                    <Satisfaction
                        tip={totalPayment.friendTip}
                        handleChange={(e) => handleChange(e, "friendTip")}
                    />
                </span>
            </Field>
            <Footer
                totalPayment={totalPayment}
                handleReset={() =>
                    setTotalPayment({
                        bill: 0,
                        yourTip: 0,
                        friendTip: 0,
                    })
                }
            />
        </div>
    );
}

export default App;
