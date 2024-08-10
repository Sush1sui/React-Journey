import React from "react";
import Friend from "./Friend";

export default function FriendsList({
    friends,
    handleFriendSelect,
    selectedFriend,
}) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend
                    friend={friend}
                    handleFriendSelect={handleFriendSelect}
                    selectedFriend={selectedFriend}
                    key={friend.id}
                />
            ))}
        </ul>
    );
}
