import { useCallback, useEffect, useState } from "react";
import { statusMessages, type IApiError } from "../types/error";
import type { IUser } from "../types/user";

export const useUsers = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [data, setData] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<IApiError | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${API_URL}/users`);
            if (!res.ok) {
                const customMessage =
                    statusMessages[res.status] || res.statusText || "Unexpected error";
                throw {
                    status: res.status,
                    message: customMessage,
                } as IApiError;
            }
            const users: IUser[] = await res.json();
            setData(users);
        } catch (err) {
            if (
                typeof err === "object" &&
                err !== null &&
                "status" in err &&
                "message" in err
            ) {
                setError({
                    status: (err as { status?: number }).status || 500,
                    message: (err as { message?: string }).message || "Unexpected error",
                });
            } else {
                setError({
                    status: 500,
                    message: "Unexpected error",
                });
            }
        } finally {
            setIsLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    const refetch = () => {
        fetchUsers();
    };
    return { data, isLoading, error, refetch };
};
