import { TrendingUp, Users } from "lucide-react";
import BlurText from "../components/animations/BlurText";
import FadeContent from "../components/animations/FadeContent";
import FilterControls from "../components/FilterControls";
import { UserGrid } from "../components/UserGrid";
import { useUserFiltering } from "../hooks/useFiltering";
import { useUsers } from "../hooks/useUsers";
import CountUp from "../components/animations/CountUp";

const Index: React.FC = () => {
  const { data: users, isLoading, error, refetch } = useUsers();
  const { filters, setFilters, filteredUsers, cities, companies } =
    useUserFiltering(users);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-card-border shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-2">
            <FadeContent
              blur={true}
              duration={1000}
              easing="ease-out"
              initialOpacity={0}
            >
              <div className="w-12 h-12 [background:var(--gradient-primary)] rounded-lg flex items-center justify-center shadow-md">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
            </FadeContent>

            <div>
              <BlurText
                text="User Directory"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-3xl font-bold text-foreground"
              />
              <BlurText
                text="Discover and connect with team members"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-muted-foreground"
              />
            </div>
          </div>
          {!isLoading && (
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>
                  <CountUp
                    from={0}
                    to={filteredUsers.length}
                    separator=","
                    direction="up"
                    duration={1}
                  />{" "}
                  users
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <CountUp
                    from={0}
                    to={cities.length}
                    separator=","
                    direction="up"
                    duration={1}
                  />{" "}
                  cities
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <CountUp
                    from={0}
                    to={companies.length}
                    separator=","
                    direction="up"
                    duration={1}
                  />{" "}
                  companies
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="space-y-6 ">
          {/* Search and Filters */}
          <FadeContent
            blur={true}
            duration={1000}
            easing="ease-out"
            initialOpacity={0}
          >
            <FilterControls
              filters={filters}
              onFiltersChange={setFilters}
              cities={cities}
              companies={companies}
              isLoading={isLoading}
            />
          </FadeContent>
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
