import { Filter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { IFilterState } from "../types/filters";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import BlurText from "./animations/BlurText";
import FadeContent from "./animations/FadeContent";

interface IFilterControlsProps {
  filters: IFilterState;
  onFiltersChange: (filters: IFilterState) => void;
  cities: string[];
  companies: string[];
  isLoading?: boolean;
}
const FilterControls: React.FC<IFilterControlsProps> = ({
  filters,
  onFiltersChange,
  cities,
  companies,
  isLoading = false,
}) => {
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: localSearch });
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, localSearch, onFiltersChange]);

  const handleClearFilters = () => {
    setLocalSearch("");
    onFiltersChange({ search: "", city: "all", company: "all" });
  };

  const hasActiveFilters = filters.search || filters.city || filters.company;

  return (
    <div className="filter-container">
      <div className="flex items-center space-x-2 mb-4">
        <FadeContent
          blur={true}
          duration={1000}
          easing="ease-out"
          initialOpacity={0}
        >
          <Filter className="w-5 h-5 text-primary" />
        </FadeContent>

        <BlurText
          text="Search & Filter"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-lg font-semibold text-card-foreground"
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="ml-auto cursor-pointer"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>
      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by user name..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              disabled={isLoading}
              className="bg-background/50 border border-border transition-all duration-200 pl-10"
            />
          </div>

          {/* City Filter */}
          <Select
            value={filters.city}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, city: value })
            }
            disabled={isLoading}
          >
            <SelectTrigger className="bg-background/50 border border-border transition-all duration-200  cursor-pointer">
              <SelectValue placeholder="Filter by city" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border">
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Company Filter */}
          <Select
            value={filters.company}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, company: value })
            }
            disabled={isLoading}
          >
            <SelectTrigger className="bg-background/50 border border-border transition-all duration-200  cursor-pointer">
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border">
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FadeContent>
    </div>
  );
};

export default FilterControls;
