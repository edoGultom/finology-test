import { useState, useMemo } from 'react';
import type { IUser } from '../types/user';
import type { IFilterState } from '../types/filters';

export const useUserFiltering = (users: IUser[]) => {
    const [filters, setFilters] = useState<IFilterState>({
        search: '',
        city: 'all',
        company: 'all'
    });

    const filteredUsers = useMemo(() => {
        const searchLower = filters.search.toLowerCase();

        return users.filter((user) => {
            const matchesSearch = !filters.search ||
                user.name.toLowerCase().includes(searchLower) ||
                user.username.toLowerCase().includes(searchLower);

            const matchesCity = filters.city === 'all' || user.address.city === filters.city;

            const matchesCompany = filters.company === 'all' || user.company.name === filters.company;

            return matchesSearch && matchesCity && matchesCompany;
        });
    }, [users, filters]);

    const cities = useMemo(() => {
        return Array.from(new Set(users.map(user => user.address.city))).sort();
    }, [users]);

    const companies = useMemo(() => {
        return Array.from(new Set(users.map(user => user.company.name))).sort();
    }, [users]);

    return {
        filters,
        setFilters,
        filteredUsers,
        cities,
        companies
    };
};