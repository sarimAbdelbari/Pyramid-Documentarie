import React from "react";
import useFetchData from "@/hooks/useFetchData";

const TopTenUsers = () => {
  // Fetch data using the custom hook
  const { data, error } = useFetchData(
    `${import.meta.env.VITE_API_URL}/users/TopUsers`
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Top Utilisateurs
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Classement des utilisateurs avec le plus de documents
        </p>
      </div>

      {/* Users List */}
        <div className="grid grid-cols-1  gap-4 max-h-96 overflow-y-auto">
          {data &&
            data.slice(0, 4).map((item, index) => (
          <div
            key={item.user._id}
            className="flex  items-center gap-4 bg-lightCyen dark:bg-gray-700 p-4 rounded-lg shadow-md"
          >
            {/* Rank */}
            <div className="text-center">
              <p className="text-md font-semibold text-gray-800 dark:text-gray-100">
            {`${index + 1}st`}
              </p>
            </div>

            {/* Avatar */}
            <img
              src={`https://ui-avatars.com/api/?name=${item.user.userName}&background=random`}
              alt={`${item.user.userName}`}
              className="w-9 h-9 rounded-full"
            />

            {/* User Info */}
            <div className="flex flex-col items-center">
              <p className="text-md font-medium text-gray-800 dark:text-gray-100">
            {item.user.userName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.user.email}
              </p>
            </div>

            {/* Documents Count */}
            <div className="text-center">
              <p className="text-md font-semibold text-gray-800 dark:text-gray-100">
            {item["routes count"]}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
            Documents
              </p>
            </div>
          </div>
            ))}
        </div>
          </div>
        );
};

export default TopTenUsers;
