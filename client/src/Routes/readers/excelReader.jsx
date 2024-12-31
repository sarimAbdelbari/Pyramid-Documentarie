import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Button from "@/components/button";
import { FaFileDownload } from "react-icons/fa";

const ExcelReader = ({ route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  const ExcelUrl = `${import.meta.env.VITE_PUBLIC_URLFILE}/${route.file}`;

  const fetchAndParseExcel = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await fetch(ExcelUrl);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    } catch (error) {
      setError('Erreur lors de la récupération ou de l\'analyse du fichier Excel.');
      console.error('Error fetching or parsing the Excel file:', error);
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  useEffect(() => {
    fetchAndParseExcel();
  }, [ExcelUrl]); // Dependency on ExcelUrl, ensuring fetch only happens when URL changes

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
        {route.title}
      </h3>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex justify-between items-center my-4 w-full">
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Téléchargez le fichier Excel
        </p>
        <div onClick={() => window.open(ExcelUrl, '_blank')} className="cursor-pointer">
          <Button Text="Télécharger" Icon={<FaFileDownload />} />
        </div>
      </div>

      {/* Error Handling */}
      {error && (
        <p className="text-center text-red-500 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Loading State */}
      {loading && !error && (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Récupération du fichier Excel...
        </p>
      )}

      {/* Data Display */}
      {data.length > 0 && !loading && !error ? (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                {Object.keys(data[0]).map((key, index) => (
                  <th
                    key={index}
                    className="border px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`odd:bg-gray-50 dark:odd:bg-gray-700 ${
                    rowIndex % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                >
                  {Object.values(row).map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className="border px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-600 dark:text-gray-300"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && !error && (
          <p className="text-center text-gray-700 dark:text-gray-300">
            Aucune donnée disponible.
          </p>
        )
      )}
    </div>
  );
};

export default ExcelReader;
