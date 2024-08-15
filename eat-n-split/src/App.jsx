import { useState } from "react";
import FriendsList from "./components/FriendsList";
import FormAddFriend from "./components/FormAddFriend";
import Button from "./components/Button";
import FormSplitBill from "./components/FormSplitBill";

function App() {
    const [friends, setFriends] = useState([
        {
            id: 118836,
            name: "Clark",
            image: "https://i.pravatar.cc/48?u=118836",
            balance: -7,
        },
        {
            id: 933372,
            name: "Sarah",
            image: "https://i.pravatar.cc/48?u=933372",
            balance: 20,
        },
        {
            id: 499476,
            name: "Anthony",
            image: "https://i.pravatar.cc/48?u=499476",
            balance: 0,
        },
    ]);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleAddFriend = (newFriend) =>
        setFriends((prev) => [...prev, newFriend]);

    const handleFriendSelect = (friend) => {
        setSelectedFriend(selectedFriend?.id === friend.id ? null : friend);
        setShowAddFriend(false);
    };

    const handleSplitBill = (value) => {
        setFriends((friends) =>
            friends.map((friend) =>
                friend.id === selectedFriend.id
                    ? { ...friend, balance: friend.balance + value }
                    : friend
            )
        );
        setSelectedFriend(null);
    };

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList
                    friends={friends}
                    selectedFriend={selectedFriend}
                    handleFriendSelect={handleFriendSelect}
                />
                {showAddFriend && (
                    <FormAddFriend handleAddFriend={handleAddFriend} />
                )}
                <Button handleClick={() => setShowAddFriend((e) => !e)}>
                    {showAddFriend ? "Close" : "Add friend"}
                </Button>
            </div>

            {selectedFriend && (
                <FormSplitBill
                    key={selectedFriend.id}
                    friend={selectedFriend}
                    handleSplitBill={handleSplitBill}
                />
            )}
        </div>
    );
}

export default App;
