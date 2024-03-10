// Преобразование окончаний слов, используется в GroupList, может использоваться и в других местах
import { Group } from "../types/types";
import { declineWord } from "./declineWord";

const formatMemberCount = (group: Group): string => {
    const memberCountText = `${group.members_count} ${declineWord(
        group.members_count,
        "подписчик",
        "подписчика",
        "подписчиков"
    )}`;

    if (group.friends?.length) {
        return `${memberCountText} (${group.friends.length} ${declineWord(
            group.friends.length,
            "друг",
            "друга",
            "друзей"
        )})`;
    }

    return memberCountText;
};

export default formatMemberCount;
