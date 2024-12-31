import React from "react";
import TopTenUsers from "@/components/statistiques/topTenUsers";
import PieDocuments from "@/components/statistiques/pieDocuments";
import BoxOfCards from "@/components/statistiques/boxOfCards";
import ActiveGroops from "@/components/statistiques/activeGroops";

const TableauDeBord = () => {
  return (
    <div className="bg-secLightBg dark:bg-secDarkBg min-h-screen p-4">
      {/* Page Header */}
      <div>
        <h3 className="text-3xl font-medium pb-6 text-center dark:text-textDarkColor text-textLightColor">
          Statistiques Générales
        </h3>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <BoxOfCards />
        <PieDocuments />
        <ActiveGroops />
        <TopTenUsers />
      </div>
    </div>
  );
};

export default TableauDeBord;
