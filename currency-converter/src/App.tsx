import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

type convertType = {
    from: string;
    to: string;
};

function App() {
    const [output, setOutput] = useState<number>(0);
    const [convert, setConvert] = useState<convertType>({
        from: "USD",
        to: "USD",
    });
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        const abortController = new AbortController();
        async function convertCurrency() {
            try {
                if (value.length === 0) return;
                if (convert.from === convert.to)
                    return setOutput(Number(value));

                const res = await fetch(
                    `https://api.frankfurter.app/latest?amount=${value}&from=${convert.from}&to=${convert.to}`,
                    { signal: abortController.signal }
                );

                console.log(res);

                if (!res.ok)
                    throw new Error(
                        "Something went wrong with converting the values"
                    );

                const data = await res.json();

                setOutput(data.rates[convert.to]);
            } catch (error) {
                console.log(error);
            }
        }

        convertCurrency();

        return () => abortController.abort();
    }, [value, convert]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setConvert((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) return;
        setValue(e.target.value);
    };

    return (
        <div>
            <input type="text" value={value} onChange={handleValueChange} />
            <select name="from" onChange={handleSelect} value={convert.from}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select name="to" onChange={handleSelect} value={convert.to}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>{output ? output : null}</p>
        </div>
    );
}

export default App;
