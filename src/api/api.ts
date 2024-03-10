import { GetGroupsResponse, Group } from "../types/types";

const MOCK_GROUPS_URL = "/groups.json";

export const fetchGroups = async (): Promise<GetGroupsResponse> => {
    try {
        const response = await fetch(MOCK_GROUPS_URL);
        const data: Group[] = await response.json();

        return {
            result: 1,
            data: data.map((group) => ({
                ...group,
                avatar_color: group.avatar_color || "no-color",
            })),
        };
    } catch (error) {
        console.error("Error filling mock groups response", error);
        return {
            result: 0,
        };
    }
};
