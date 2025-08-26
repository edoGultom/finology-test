
export interface IFilterControlsProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedCity: string;
    onCityChange: (value: string) => void;
    selectedCompany: string;
    onCompanyChange: (value: string) => void;
    cities: string[];
    companies: string[];
    onClearFilters: () => void;
  }