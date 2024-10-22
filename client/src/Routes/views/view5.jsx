import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';

const View5 = ({ route, preview }) => {
  const [data, setData] = useState([]);
  const { routeData } = useStateContext();

  useEffect(() => {
    const getViewData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/route/parrentId/${route._id}`
        );

        if (!preview) {
          const responseIds = response.data.map((item) => item._id);
          const newRoutes = routeData.filter((route) =>
            responseIds.includes(route._id)
          );
          setData(newRoutes);
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching view data:', error);
      }
    };

    getViewData();
  }, [route, routeData, preview]);

  return (
    <div className="pt-20 px-4">
      {/* Title Section */}
      <div className="text-center flex flex-col items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
          {route.title}
        </h1>
        <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 w-full md:w-3/5">
          {route.details}
        </p>
      </div>

      {/* Content Section */}
      <div className="my-11 w-full flex flex-col items-center gap-6">
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
          {/* Header */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 text-gray-700 dark:text-gray-200 font-semibold text-sm md:text-xl py-4 px-4">
            <div className="text-start">Lien</div>
            <div className="text-center">Auteur</div>
            <div className="text-center">Details</div>
            <div className="text-end">Date</div>
          </div>

          {/* Data Rows */}
          <div className="h-96 overflow-y-auto">
            {data.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={item._id}
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-md items-center transition duration-300 ease-in-out ${
                    index % 2 === 0
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <Link
                    to={item.path}
                    className="text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="text-center md:text-left">{item.title}</p>
                  <p className="text-center text-sm md:text-base">
                    {item.details}
                  </p>
                  <p className="text-end text-sm md:text-base">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-300">
                No data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View5;
