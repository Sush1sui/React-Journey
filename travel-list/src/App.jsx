import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

function App() {
    const [items, setItems] = useState([
        { id: 1, description: "Passports", quantity: 2, packed: false },
        { id: 2, description: "Socks", quantity: 12, packed: true },
        { id: 3, description: "Charger", quantity: 1, packed: false },
    ]);

    const handleAddItem = (newItem) => {
        setItems((prev) => [...prev, newItem]);
    };

    const handleDeleteItem = (itemToDelete) => {
        setItems((prev) => prev.filter((item) => item.id !== itemToDelete));
    };

    const handleToggleItem = (itemToToggle) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id !== itemToToggle
                    ? item
                    : { ...item, packed: !item.packed }
            )
        );
    };

    const handleClearList = () => {
        if (items.length > 0) {
            const confirmed = window.confirm(
                "Are you sure you want to delete all items?"
            );
            if (confirmed) setItems([]);
        }
    };

    return (
        <div className="app">
            <Logo />
            <Form handleAddItem={handleAddItem} />
            <PackingList
                items={items}
                handleDeleteItem={handleDeleteItem}
                handleToggleItem={handleToggleItem}
                handleClearItems={handleClearList}
            />
            <Stats items={items} />
        </div>
    );
}

export default App;
