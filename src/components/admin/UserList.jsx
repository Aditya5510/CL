import { useState } from "react";
import EmptyState from "../common/EmptyState";

export default function UserList({ users }) {
  const [expandedUsers, setExpandedUsers] = useState(new Set());

  if (users.length === 0) {
    return <EmptyState message="No users found" />;
  }

  const toggleUser = (userId) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  return (
    <>
      <div className="md:hidden space-y-3">
        {users.map((user) => {
          const isExpanded = expandedUsers.has(user.id);
          return (
            <div
              key={user.id}
              className="bg-white border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleUser(user.id)}
                className="w-full text-left p-4 bg-yellow-100 text-gray-900 font-semibold flex items-center justify-between hover:bg-yellow-200 transition-colors"
              >
                <span>{user.name}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isExpanded && (
                <div className="p-4 space-y-3 bg-white text-gray-700 border-t border-gray-200">
                  <div>
                    <span className="text-gray-900 font-semibold">ID: </span>
                    <span>{user.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-semibold">Email: </span>
                    <span>{user.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-semibold">Role: </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium ${
                        user.role === "teacher"
                          ? "bg-yellow-500/30 text-gray-900 border border-yellow-500/40"
                          : "bg-yellow-500/20 text-gray-900 border border-yellow-500/30"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-semibold">
                      Enrolled Courses:{" "}
                    </span>
                    <span>
                      {user.enrolledCourses?.length || 0} course
                      {user.enrolledCourses?.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-semibold">
                      Progress:{" "}
                    </span>
                    <span>
                      {user.progress && Object.keys(user.progress).length > 0
                        ? Object.entries(user.progress)
                            .map(
                              ([courseId, progress]) =>
                                `Course ${courseId}: ${Math.round(
                                  progress * 100
                                )}%`
                            )
                            .join(", ")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden md:block">
        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Enrolled Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium ${
                          user.role === "teacher"
                            ? "bg-yellow-500/30 text-gray-900 border border-yellow-500/40"
                            : "bg-yellow-500/20 text-gray-900 border border-yellow-500/30"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.enrolledCourses?.length || 0} course
                      {user.enrolledCourses?.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.progress && Object.keys(user.progress).length > 0
                        ? Object.entries(user.progress)
                            .map(
                              ([courseId, progress]) =>
                                `Course ${courseId}: ${Math.round(
                                  progress * 100
                                )}%`
                            )
                            .join(", ")
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
