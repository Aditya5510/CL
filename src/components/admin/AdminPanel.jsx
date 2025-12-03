import { useApp } from "../../context/AppContext";
import UserList from "./UserList";
import LoadingSpinner from "../common/LoadingSpinner";
import EmptyState from "../common/EmptyState";

export default function AdminPanel() {
  const { users, loading, error } = useApp();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <EmptyState message={`Error: ${error}`} />;
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          User Management
        </h2>
        <UserList users={users} />
      </div>
    </div>
  );
}
