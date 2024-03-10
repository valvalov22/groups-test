// Логика фильтрации
import { Group, User } from "../types/types";

interface Filter {
    privacy: string;
    avatarColor: string;
    hasFriends: boolean;
    search: string;
}

const filterGroups = (groups: Group[], filter: Filter): Group[] => {
    return groups.filter((group) => {
        const privacyFilter =
            filter.privacy === "all" ||
            (filter.privacy === "closed" && group.closed) ||
            (filter.privacy === "open" && !group.closed);

        const colorFilter =
            filter.avatarColor === "any" ||
            (group.avatar_color && group.avatar_color === filter.avatarColor);

        const friendsFilter =
            !filter.hasFriends || (group.friends && group.friends.length > 0);

        const searchFilter =
            group.name.toLowerCase().includes(filter.search.toLowerCase()) ||
            (group.friends &&
                group.friends.some(
                    (friend: User) =>
                        friend.first_name
                            .toLowerCase()
                            .includes(filter.search.toLowerCase()) ||
                        friend.last_name
                            .toLowerCase()
                            .includes(filter.search.toLowerCase())
                ));

        return privacyFilter && colorFilter && friendsFilter && searchFilter;
    });
};

export default filterGroups;
