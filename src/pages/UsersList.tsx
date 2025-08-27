import { Users } from "lucide-react";
import { ErrorMessage } from "../components/common/ErrorMessage";
import Loaader from "../components/common/Loader";
import FilterControls from "../components/FilterControls";
import { UserCard } from "../components/UserCard";
import { useUsers } from "../hooks/useUsers";

const UserList: React.FC = () => {
  const {
    isLoading,
    error,
    cities,
    companies,
    searchTerm,
    selectedCity,
    selectedCompany,
    refetch,
    setSelectedCity,
    setSelectedCompany,
    setSearchTerm,
    clearFilters,
    filteredUsers,
  } = useUsers();
  return (
    <div className="container mx-auto px-4 py-8  min-h-screen flex flex-col gap-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 [background:var(--gradient-primary)] rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">User Directory</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover and connect with team members
        </p>
      </div>
      {/* Filter Controls */}
      {!isLoading && !error && (
        <FilterControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          selectedCompany={selectedCompany}
          onCompanyChange={setSelectedCompany}
          cities={cities}
          companies={companies}
          onClearFilters={clearFilters}
        />
      )}
      {/* Content */}
      {isLoading && <Loaader />}
      {error && <ErrorMessage onRetry={refetch} error={error} />}

      {!isLoading && !error && (
        <div className="">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredUsers.length} of {filteredUsers.length} users
            </p>
          </div>
          {/* Users */}
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No users found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or clearing the filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
