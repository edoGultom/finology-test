import { useCallback, useEffect, useMemo, useState } from "react";
import { statusMessages, type IApiError } from "../types/error";
import type { IUser } from "../types/user";

export const useUsers = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<IApiError | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");

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

  const cities = useMemo(() => {
    return Array.from(new Set(data.map((user) => user.address.city))).sort();
  }, [data]);

  const companies = useMemo(() => {
    return Array.from(new Set(data.map((user) => user.company.name))).sort();
  }, [data]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("all");
    setSelectedCompany("all");
  };

  const refetch = () => {
    fetchUsers();
  };

  // Filter users based on search term and filters
  const filteredUsers = useMemo(() => {
    return data.filter((user) => {
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        searchTerm === "" ||
        user.name.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower);

      const matchesCity =
        selectedCity === "all" || user.address.city === selectedCity;

      const matchesCompany =
        selectedCompany === "all" || user.company.name === selectedCompany;

      return matchesSearch && matchesCity && matchesCompany;
    });
  }, [data, searchTerm, selectedCity, selectedCompany]);

  return {
    data,
    isLoading,
    error,
    cities,
    companies,
    searchTerm,
    selectedCity,
    selectedCompany,
    setSelectedCity,
    setSelectedCompany,
    setSearchTerm,
    clearFilters,
    refetch,
    filteredUsers,
  };
};
