// подкомпонент GroupList, показывает список друзей в сообществе
import { Avatar, SimpleCell } from "@vkontakte/vkui";
import React from "react";
import { User } from "../../../types/types";
import { FRIENDS_AVATAR_PLACEHOLDER } from "../../../assets/placeholder";

const FriendList: React.FC<{ friends: User[] }> = ({ friends }) => {
    return (
        <div style={{ marginTop: "10px" }}>
            <p>Друзья:</p>
            {friends.map((friend, index) => (
                <SimpleCell
                    key={index}
                    before={
                        <Avatar size={40} src={FRIENDS_AVATAR_PLACEHOLDER} />
                    }
                >
                    {friend.first_name} {friend.last_name}
                </SimpleCell>
            ))}
        </div>
    );
};

export default FriendList;
