// Компонент для фильтрации сообществ
import React from "react";
import { Select, Checkbox, Search } from "@vkontakte/vkui";

interface GroupFilterProps {
    privacy: string;
    avatarColor: string;
    hasFriends: boolean;
    onPrivacyChange: (value: string) => void;
    onAvatarColorChange: (value: string) => void;
    onHasFriendsChange: () => void;
    searchValue: string;
    onChangeSearchValue: (value: string) => void;
}

interface Option {
    value: string;
    label: string;
}

//Список опций для селектов
const privacyOptions: Option[] = [
    { value: "all", label: "Любое" },
    { value: "open", label: "Открытое сообщество" },
    { value: "closed", label: "Закрытое сообщество" },
];

const colorOptions: Option[] = [
    { value: "any", label: "Любой цвет" },
    { value: "red", label: "Красный" },
    { value: "green", label: "Зеленый" },
    { value: "yellow", label: "Желтый" },
    { value: "blue", label: "Синий" },
    { value: "purple", label: "Фиолетовый" },
    { value: "white", label: "Белый" },
    { value: "orange", label: "Оранжевый" },
    { value: "no-color", label: "Без цвета" },
];

const GroupFilter: React.FC<GroupFilterProps> = ({
    privacy,
    avatarColor,
    hasFriends,
    searchValue,
    onPrivacyChange,
    onAvatarColorChange,
    onHasFriendsChange,
    onChangeSearchValue,
}) => {
    return (
        <>
            <Search
                style={{ maxWidth: "320px" }}
                value={searchValue}
                onChange={(e) => onChangeSearchValue(e.target.value)}
            />
            <label htmlFor="select-privacy">Тип сообщества</label>
            <Select
                id="select-privacy"
                placeholder="Privacy"
                options={privacyOptions}
                value={privacy}
                onChange={(e) => onPrivacyChange(e.target.value)}
            />
            <label htmlFor="select-color">Цвет фона сообщества</label>
            <Select
                placeholder="Avatar color"
                id="select-color"
                options={colorOptions}
                value={avatarColor}
                onChange={(e) => onAvatarColorChange(e.target.value)}
            />
            <Checkbox checked={hasFriends} onChange={onHasFriendsChange}>
                {" "}
                Друзья в сообществе:{" "}
            </Checkbox>
        </>
    );
};

export default GroupFilter;
