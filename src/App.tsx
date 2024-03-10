import React from "react";
import { View, Panel, PanelHeader, Group } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import GroupList from "./components/GroupList/GroupList";
import GroupFilter from "./components/GroupFilter/GroupFilter";
import useGroupData from "./hooks/useGroupData";
import useFilterHandlers from "./hooks/useFilterHandlers";

const App: React.FC = () => {
    const { groups, loading, error } = useGroupData();
    const [filter, filterHandlers, showFriendsMap] = useFilterHandlers(groups);

    return (
        <View activePanel="main">
            <Panel id="main">
                <PanelHeader>Сообщества</PanelHeader>
                <Group>
                    <GroupFilter
                        privacy={filter.privacy}
                        avatarColor={filter.avatarColor}
                        hasFriends={filter.hasFriends}
                        searchValue={filter.search}
                        onChangeSearchValue={filterHandlers.handleSearchChange}
                        onPrivacyChange={(value: string) =>
                            filterHandlers.handlePrivacyChange(value)
                        }
                        onAvatarColorChange={(value: string) =>
                            filterHandlers.handleAvatarColorChange(value)
                        }
                        onHasFriendsChange={
                            filterHandlers.handleHasFriendsChange
                        }
                    />
                    <GroupList
                        groups={filterHandlers.filteredGroups}
                        showFriendsMap={showFriendsMap}
                        onFriendsClick={filterHandlers.handleFriendsClick}
                        isLoading={loading}
                        error={error}
                    />
                </Group>
            </Panel>
        </View>
    );
};

export default App;
