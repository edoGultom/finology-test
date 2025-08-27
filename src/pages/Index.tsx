import { TrendingUp, Users } from "lucide-react";
import FilterControls from "../components/FilterControls";
import { UserGrid } from "../components/UserGrid";
import { useUserFiltering } from "../hooks/useFiltering";
import { useUsers } from "../hooks/useUsers";

const Index: React.FC = () => {
  const { data: users, isLoading, error, refetch } = useUsers();
  const { filters, setFilters, filteredUsers, cities, companies } =
    useUserFiltering(users);
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b border-card-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 [background:var(--gradient-primary)] rounded-lg flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                User Directory
              </h1>
              <p className="text-muted-foreground">
                Discover and connect with team members
              </p>
            </div>
          </div>

          {!isLoading && (
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>
                  {filteredUsers.length} of {users.length} users
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>{cities.length} cities</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{companies.length} companies</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6 flex flex-col">
          {/* Search and Filters */}
          <FilterControls
            filters={filters}
            onFiltersChange={setFilters}
            cities={cities}
            companies={companies}
            isLoading={isLoading}
          />

          {/* User Grid */}
          <UserGrid
            users={filteredUsers}
            isLoading={isLoading}
            error={error}
            onRefetch={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
