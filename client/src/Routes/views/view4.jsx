import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/utils/loadingScreen';
import { useStateContext } from '@/contexts/ContextProvider';

const View4 = ({ route, preview }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const { routeData } = useStateContext();

  useEffect(() => {
    const getViewData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/route/parrentId/${route._id}`
        );

        if (!preview) {
          // Extract the IDs from response.data
          const responseIds = response.data.map((item) => item._id);
          // Filter routes based on whether their _id is in the responseIds array
          const newRoutes = routeData.filter((route) =>
            responseIds.includes(route._id)
          );
          setData(newRoutes);
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching view data:', error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    getViewData();
  }, [route, routeData, preview]); // Ensure routeData is included in the dependencies

  const getImageSrc = (src) => {
    return src
      ? `${import.meta.env.VITE_PUBLIC_URL1}/${src}`
      : `${import.meta.env.VITE_PUBLIC_URL1}/imageHolder.jpg`;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="my-8">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 place-items-center">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center flex-col m-4 rounded-3xl shadow-2xl px-4 py-7 w-full h-full dark:shadow-md dark:shadow-white bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg transition duration-300 ease-in-out"
            >
              <Link to={item.path} className="w-full flex gap-7 justify-between items-center">
                <div className="mx-4 flex-1">
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

                {item.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={getImageSrc(item.image)}
                      alt={item.title || 'Item image'}
                      className="object-contain h-32 md:h-48 pointer-events-none rounded-xl"
                    />
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-textLightColor dark:text-textDarkColor mt-8">
          <p>No data available.</p>
        </div>
      )}
    </div>
  );
};

export default View4;
