import React from "react";

export default function Stats({ items }) {
    if (!items.length)
        return (
            <p className="stats">
                <em>Start adding some items to your packing list🚀</em>
            </p>
        );

    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const packedPercentage = Math.round((numPacked / numItems) * 100);
    return (
        <footer className="stats">
            <em>
                {packedPercentage < 100 ? (
                    <>
                        💼 You have {numItems} items on your list, and you
                        already packed {numPacked} ({packedPercentage}%)
                    </>
                ) : (
                    <>You got everything! Ready to go✈️</>
                )}
            </em>
        </footer>
    );
}
