import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackagingList from "./components/PackagingList";
import Stats from "./components/Stats";

function App() {
    const [initialItems, setInitialItems] = useState([
        { id: 1, description: "Passports", quantity: 2, packed: false },
        { id: 2, description: "Socks", quantity: 12, packed: true },
        { id: 3, description: "Charger", quantity: 1, packed: false },
    ]);

    const handleAddItem = (newItem) => {
        setInitialItems((prev) => [...prev, newItem]);
    };

    return (
        <div className="app">
            <Logo />
            <Form handleAddItem={handleAddItem} />
            <PackagingList items={initialItems} />
            <Stats />
        </div>
    );
}

export default App;
