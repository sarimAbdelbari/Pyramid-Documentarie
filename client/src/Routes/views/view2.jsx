import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';

const View2 = ({ route, preview }) => {
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
        console.error('Error fetching data:', error);
      }
    };

    getViewData();
  }, [route, routeData, preview]);

  const getImageSrc = (src) => {
    return src
      ? `${import.meta.env.VITE_PUBLIC_URL1}/${src}`
      : `${import.meta.env.VITE_PUBLIC_URL1}/imageHolder.jpg`;
  };

  const getGridClasses = () => {
    switch (data.length) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      default:
        return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
    }
  };

  return (
    <div className="p-8">
      {data.length > 0 ? (
        <div
          className={`grid grid-flow-row justify-center place-items-center gap-7 ${getGridClasses()}`}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full h-full dark:shadow-md dark:shadow-white flex justify-center items-center flex-col my-4 shadow-2xl py-6 rounded-3xl bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg transition duration-300 ease-in-out"
            >
              <Link
                to={item.path}
                className="flex gap-7 flex-row-reverse justify-around items-center w-full"
              >
                <div className="mx-9">
                  {item.title && (
                    <p className="my-2 text-start text-2xl text-textLightColor dark:text-textDarkColor font-semibold">
                      {item.title}
                    </p>
                  )}
                  {item.details && (
                    <p className="text-start text-md text-textSecLightColor dark:text-textDarkColor font-medium">
                      {item.details}
                    </p>
                  )}
                </div>
                <img
                  src={getImageSrc(item.image)}
                  alt={item.title || 'Image preview'}
                  className="object-contain h-24 md:h-36 pointer-events-none rounded-xl"
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-8">
          <p className="text-lg text-textLightColor dark:text-textDarkColor">
            No data available to display.
          </p>
        </div>
      )}
    </div>
  );
};

export default View2;
