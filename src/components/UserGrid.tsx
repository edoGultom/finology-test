import { Users } from "lucide-react";
import type { IApiError } from "../types/error";
import type { IUser } from "../types/user";
import { ErrorMessage } from "./common/ErrorMessage";
import Loader from "./common/Loader";
// import { UserCard } from "./UserCard";
import AnimatedList from "./animations/AnimatedList";

interface UserGridProps {
  users: IUser[];
  isLoading?: boolean;
  error: IApiError | null;
  onRefetch: () => void;
}

export const UserGrid = ({
  users,
  isLoading = false,
  error,
  onRefetch,
}: UserGridProps) => {
  if (error) {
    return <ErrorMessage error={error} onRetry={onRefetch} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No users found
        </h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search criteria or clearing the filters to see more
          results.
        </p>
      </div>
    );
  }

  return (
    <AnimatedList
      items={users}
      onItemSelect={(item, index) => console.log(item, index)}
      displayScrollbar={true}
    />
  );
};
