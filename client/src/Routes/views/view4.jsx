import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/utils/loadingScreen';
import { useStateContext } from '@/contexts/ContextProvider';

const View4 = ({ route }) => {
  const [data, setData] = useState([]);
  const { routeData } = useStateContext();

  useEffect(() => {
    const getViewData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/route/parrentId/${route._id}`
        );

        // Extract the IDs from response.data
        const responseIds = response.data.map((item) => item._id);

        // Filter routes based on whether their _id is in the responseIds array
        const newRoutes = routeData.filter((route) => responseIds.includes(route._id));

        setData(newRoutes);
      } catch (error) {
        console.error('Error fetching view data:', error);
      }
    };

    getViewData();
  }, [route, routeData]); // Ensure routeData is included in the dependencies

  const getImageSrc = (src) => {
    return src.startsWith('http') ? src : `${import.meta.env.VITE_PUBLIC_URL1}/${src}`;
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="pt-12">
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-12 place-content-center">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex justify-center items-center flex-col m-4 rounded-3xl shadow-2xl p-7 dark:shadow-md dark:shadow-white bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg transition duration-300 ease-in-out"
              >
                <Link to={item.path} className="w-full h-80 flex gap-7 justify-center items-center">
                  <div>
                    {item.title && (
                      <p className="my-2 text-center text-2xl text-textLightColor dark:text-textDarkColor font-semibold">
                        {item.title}
                      </p>
                    )}
                    {item.details && (
                      <p className="text-center text-lg text-textSecLightColor dark:text-textDarkColor font-medium">
                        {item.details}
                      </p>
                    )}
                  </div>

                  {item.image && (
                    <div>
                      <img
                        src={getImageSrc(item.image)}
                        alt={item.title}
                        className="object-contain h-32 md:h-48 pointer-events-none rounded-xl"
                      />
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default View4;
