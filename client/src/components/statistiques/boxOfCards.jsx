import React, { useEffect, useRef, useState } from "react";
import { FaUncharted } from "react-icons/fa6";
import { TbUsersGroup } from "react-icons/tb";
import { LiaUsersSolid } from "react-icons/lia";
import { FcExpired, FcDocument } from "react-icons/fc";
import useFetchData from "@/hooks/useFetchData";

const BoxOfCards = () => {
  const [usersStats, setUsersStats] = useState({});
  const fileStats = useRef({ expired: "", norms: "" });

  const { data, loading, error } = useFetchData(
    `${import.meta.env.VITE_API_URL}/stats/user`
  );

  const { data: data2, loading: loading2, error: error2 } = useFetchData(
    `${import.meta.env.VITE_API_URL}/route/files`
  );

  useEffect(() => {
    if (data2 && data2.length > 0) {
      let expired = [];
      let norms = [];
      const currentDate = new Date();

      data2.forEach((d) => {
        const expireDate = new Date(d.expiredate);
        if (expireDate < currentDate) {
          expired.push(d);
        } else {
          norms.push(d);
        }
      });

      fileStats.current.expired = expired.length;
      fileStats.current.norms = norms.length;
    }

    setUsersStats(data);
  }, [data, data2]);

  if (loading || loading2) {
    return <div>Loading...</div>;
  }

  if (error || error2) {
    return <div>Error: {error || error2}</div>;
  }

  // Reusable card component
  const StatisticCard = ({ title, icon, value, color, description }) => (
    <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-4 my-2 flex flex-col justify-between min-h-40 duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <div
          className={`text-3xl ${color} flex justify-center items-center w-10 h-10 rounded-full`}
        >
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xl font-semibold my-4 text-gray-800 dark:text-gray-300">
        <span>{value}</span>
      </div>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
      {/* Total Users */}
      <StatisticCard
        title="Nombre de Utilisateurs"
        icon={<LiaUsersSolid />}
        value={usersStats?.totalUsers || 0}
        color="text-blue-500 dark:text-blue-400"
        description="Nombre total des utilisateurs."
      />
      {/* Normal Documents */}
      <StatisticCard
        title="Nombre De Document Norm"
        icon={<FcDocument />}
        value={fileStats.current.norms || 0}
        color="text-green-500 dark:text-green-400"
        description="Documents non expirés."
      />
      {/* Expired Documents */}
      <StatisticCard
        title="Nombre De Document Expirée"
        icon={<FcExpired />}
        value={fileStats.current.expired || 0}
        color="text-red-500 dark:text-red-400"
        description="Documents expirés."
      />
      {/* Common Group */}
      <StatisticCard
        title="Groupe commun"
        icon={<TbUsersGroup />}
        value={`${usersStats?.numberOftheMostCommunGroop || 0} ${
          usersStats?.most_common_groop?.groopName || ""
        }`}
        color="text-purple-500 dark:text-purple-400"
        description="Le groupe le plus utilisé."
      />
    </div>
  );
};

export default BoxOfCards;
