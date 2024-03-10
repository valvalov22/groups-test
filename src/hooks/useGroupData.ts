// основной хук, который взаимодействует с api и формирует сообщества
import { useCallback, useEffect, useState } from "react";
import { fetchGroups } from "../api/api";
import { Group } from "../types/types";

interface GroupData {
    groups: Group[];
    loading: boolean;
    fetchData: () => void;
    error: string;
}

const useGroupData = (): GroupData => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = useCallback(async () => {
        try {
            const data = await fetchGroups();
            if (data.result === 1 && data.data) {
                setGroups(data.data);
            } else {
                setError(`Ошибка при получении сообществ`);
            }
        } catch (error) {
            setError(`Ошибка при получении сообществ, ${error}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(delay);
    }, [fetchData]);

    return { groups, loading, fetchData, error };
};

export default useGroupData;
