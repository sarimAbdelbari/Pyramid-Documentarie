import React, { useState, useEffect } from "react";
import { LuSearch, LuRefreshCcw } from "react-icons/lu";
import axios from "axios";

// Modal Component for Group Details
const Modal = ({ isOpen, group, onClose }) => {
  if (!isOpen || !group) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6 max-w-lg w-full transition transform scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {group.groopName}
          </h2>
          <button
            className="text-gray-500 dark:text-gray-400 text-lg hover:text-red-500"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {/* Users List */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Users
            </h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {group.groopUsers.map((user) => (
                <li
                  key={user._id}
                  className="text-gray-700 dark:text-gray-300 text-sm"
                >
                  {user.userName} - {user.email}
                </li>
              ))}
            </ul>
          </div>
          {/* Routes List */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Routes
            </h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {group.groopRoutes.map((route) => (
                <li
                  key={route._id}
                  className="text-gray-700 dark:text-gray-300 text-sm"
                >
                  {route.route.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Group Item Component
const GroupItem = ({ group, onClick }) => {
  const { groopName, groopUsers } = group;
  const limitedUsers = groopUsers.slice(0, 5);

  return (
    <div
      className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
      onClick={() => onClick(group)}
    >
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {groopName}
        </h4>
      </div>
      <div className="flex gap-2 items-center">
        {limitedUsers.map((user) => (
          <div
            key={user._id}
            className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-md"
          >
            {user.userName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </div>
        ))}
        {groopUsers.length > 5 && (
          <div className="text-gray-500 dark:text-gray-300 text-sm">
            +{groopUsers.length - 5}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const ActiveGroops = () => {
  const [groopData, setGroopData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroop, setSelectedGroop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/groop`);
      setGroopData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredGroops = groopData.filter((groop) =>
    groop.groopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          onClick={fetchData}
        >
          <LuRefreshCcw />
          Refresh
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Active Groops
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage groups, users, and routes
          </p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search groups"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <LuSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-300" />
        </div>
      </div>
      <div className="space-y-4">
        {filteredGroops.map((group) => (
          <GroupItem
            key={group._id}
            group={group}
            onClick={(group) => {
              setSelectedGroop(group);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        group={selectedGroop}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGroop(null);
        }}
      />
    </div>
  );
};

export default ActiveGroops;
