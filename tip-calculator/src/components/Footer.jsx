import React from "react";

export default function Footer({ totalPayment, handleReset }) {
    const getPercentageValue = (val, total) => val * total;

    // Check if bill is zero or empty
    if (totalPayment.bill === 0 || totalPayment.bill === "") {
        return null; // Render nothing if the bill is blank or zero
    }

    const yourTipValue = getPercentageValue(
        totalPayment.yourTip,
        totalPayment.bill
    );
    const friendTipValue = getPercentageValue(
        totalPayment.friendTip,
        totalPayment.bill
    );

    const avgTip = (yourTipValue + friendTipValue) / 2;
    const total = totalPayment.bill + avgTip;

    return (
        <footer>
            <p>
                You pay ${total} (${totalPayment.bill} + ${avgTip})
            </p>
            <br />
            <button onClick={handleReset}>Reset</button>
        </footer>
    );
}
