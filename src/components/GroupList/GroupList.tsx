// Компонент выводящий список сообществ, подходящих под фильтрацию и без фильтрации
import React from "react";
import { SimpleCell, Avatar, Paragraph, Spinner } from "@vkontakte/vkui";
import { Group } from "../../types/types";
import { GROUP_AVATAR_PLACEHOLDER } from "../../assets/placeholder";
import FriendList from "./FriendList/FriendList";
import formatMembers from "../../utils/formatMembers";

interface GroupListProps {
    groups: Group[];
    showFriendsMap: Record<number, boolean>;
    onFriendsClick: (groupId: number) => void;
    isLoading: boolean;
    error?: string;
}

const GroupList: React.FC<GroupListProps> = ({
    groups,
    showFriendsMap,
    onFriendsClick,
    isLoading,
    error,
}) => {
    return (
        <>
            {isLoading && groups.length === 0 && !error && (
                <Spinner size="large" style={{ marginTop: "20px" }} />
            )}
            {error && <SimpleCell>{error}</SimpleCell>}
            {groups.length === 0 && !isLoading && !error ? (
                <SimpleCell>Ничего не найдено 🫥</SimpleCell>
            ) : (
                groups.map((group) => (
                    <SimpleCell
                        key={group.id}
                        size={100}
                        extraSubtitle={
                            <>
                                <Paragraph
                                    weight="1"
                                    onClick={() => {
                                        onFriendsClick(group.id);
                                    }}
                                    style={{
                                        textDecoration:
                                            group.friends &&
                                            group.friends.length > 0
                                                ? "underline"
                                                : "none",
                                        cursor:
                                            group.friends &&
                                            group.friends.length > 0
                                                ? "pointer"
                                                : "text",
                                    }}
                                >
                                    {formatMembers(group)}
                                </Paragraph>
                            </>
                        }
                        after={
                            showFriendsMap[group.id] &&
                            group.friends?.length && (
                                <FriendList friends={group.friends} />
                            )
                        }
                        subtitle={
                            group.closed
                                ? "Закрытое сообщество"
                                : "Открытое сообщество"
                        }
                        before={
                            <Avatar
                                size={48}
                                src={
                                    group.avatar_color === "no-color"
                                        ? GROUP_AVATAR_PLACEHOLDER
                                        : ""
                                }
                                style={{
                                    background: group.avatar_color,
                                }}
                                initials={group.name.slice(0, 1)}
                            />
                        }
                    >
                        {group.name}
                    </SimpleCell>
                ))
            )}
        </>
    );
};

export default GroupList;
