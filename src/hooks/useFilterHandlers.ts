// хук для управления состоянием фильтрации сообществ
import { useState } from "react";
import { Group } from "../types/types";
import filterGroups from "../utils/filterGroups";

interface FilterState {
    privacy: string;
    avatarColor: string;
    hasFriends: boolean;
    search: string;
}

interface FilterHandlers {
    handlePrivacyChange: (value: string) => void;
    handleAvatarColorChange: (value: string) => void;
    handleHasFriendsChange: () => void;
    handleSearchChange: (searchValue: string) => void;
    filteredGroups: Group[];
    handleFriendsClick: (groupId: number) => void;
}

const useFilterHandlers = (
    initialGroups: Group[]
): [FilterState, FilterHandlers, Record<number, boolean>] => {
    const [filter, setFilter] = useState<FilterState>({
        privacy: "all",
        avatarColor: "any",
        hasFriends: false,
        search: "",
    });
    const [showFriendsMap, setShowFriendsMap] = useState<
        Record<number, boolean>
    >({});

    const handleFriendsClick = (groupId: number) => {
        setShowFriendsMap((prevState) => ({
            ...prevState,
            [groupId]: !prevState[groupId],
        }));
    };

    const handlePrivacyChange = (value: string) => {
        setFilter((prevFilter) => ({ ...prevFilter, privacy: value }));
    };

    const handleAvatarColorChange = (value: string) => {
        setFilter((prevFilter) => ({ ...prevFilter, avatarColor: value }));
    };

    const handleHasFriendsChange = () => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            hasFriends: !prevFilter.hasFriends,
        }));
    };

    const handleSearchChange = (searchValue: string) => {
        setFilter((prevFilter) => ({ ...prevFilter, search: searchValue }));
    };

    const filteredGroups = filterGroups(initialGroups, filter);

    const handlers: FilterHandlers = {
        handlePrivacyChange,
        handleAvatarColorChange,
        handleHasFriendsChange,
        handleSearchChange,
        handleFriendsClick,
        filteredGroups,
    };

    return [filter, handlers, showFriendsMap];
};

export default useFilterHandlers;
