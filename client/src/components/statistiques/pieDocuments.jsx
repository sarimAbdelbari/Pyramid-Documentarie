import React, { useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import useFetchData from "@/hooks/useFetchData";

const PieDocuments = () => {
  const { data, loading, error } = useFetchData(
    `${import.meta.env.VITE_API_URL}/route/files`
  );
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Organize and count data by type
      const pdfCount = data.filter((d) => d.view === "PdfReader").length;
      const excelCount = data.filter((d) => d.view === "ExcelReader").length;
      const wordCount = data.filter((d) => d.view === "WordReader").length;

      // Update pieData with counts and colors
      setPieData([
        { label: "PDF", value: pdfCount, color: "#CB0100" }, // Red for PDFs
        { label: "Excel", value: excelCount, color: "#008525" }, // Green for Excel
        { label: "Word", value: wordCount, color: "#366EC2" }, // Blue for Word
      ]);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl shadow-xl rounded-2xl bg-white dark:bg-gray-800 p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Information sur les Documents
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Visualisation des types de documents
        </p>
      </div>

      {/* Pie Chart */}
      <div className="flex justify-center">
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.label}: ${item.value}`,
              arcLabelMinAngle: 20,
              arcLabelRadius: "70%",
              innerRadius: "50%", // Optional: Donut chart style
              data: pieData,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontSize: "12px",
              fontWeight: "500",
              fill: "#FFFFFF",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)", // Better contrast
            },
          }}
          width={400}
          height={300}
        />
      </div>
    </div>
  );
};

export default PieDocuments;
