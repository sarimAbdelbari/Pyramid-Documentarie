import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';

const View1 = ({ route, preview }) => {
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
          const newRoutes = routeData.filter((route) => responseIds.includes(route._id));
          setData(newRoutes);
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getViewData();
  }, [route, routeData, preview]);

  const getImageSrc = (src) => {
    return src
      ? `${import.meta.env.VITE_PUBLIC_URL1}/${src}`
      : `${import.meta.env.VITE_PUBLIC_URL1}/imageHolder.jpg`;
  };

  return (
    <div className="py-6">
      <div className="flex flex-wrap items-center justify-center gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center m-4 w-64 lg:w-72 xl:w-80"
          >
            <Link
              to={item.path}
              className="flex flex-col items-center justify-center p-6 w-full h-full rounded-2xl shadow-lg transition duration-300 ease-in-out bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg group"
            >
              {item.image && (
                <img
                  src={getImageSrc(item.image)}
                  alt={item.title || 'Image'}
                  className="object-contain h-32 lg:h-36 xl:h-44 rounded-lg mb-4 pointer-events-none group-hover:scale-105 transition-transform duration-300"
                />
              )}
              {item.title && (
                <p className="text-center text-lg font-semibold text-textLightColor dark:text-textDarkColor">
                  {item.title}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View1;
