import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';

const View3 = ({route}) => {
  const [data, setData] = useState([]);

 
   const {routeData} = useStateContext();


   
  
  useEffect(() => {
    const getViewData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/route/parrentId/${route.route._id}`
        );

        
        
        // Extract the IDs from response.data
        const responseIds = response.data.map((item) => item._id);
        
        const routes = routeData.map((route) => route.route);
        
        // Filter routes based on whether their _id is in the responseIds array
        const newRoutes = routes.filter((route) => responseIds.includes(route._id));

        
        console.log("response" , response.data)
        console.log("routeData" , routeData)
        console.log("newRoutes",newRoutes)
        
        setData(newRoutes);
      } catch (error) {
        console.error(error);
      }
    };
  
    getViewData();
  }, [route]);
  

  const getImageSrc = (src) => {
    if (src.startsWith('http')) {
      return src;
    }
    return `${import.meta.env.VITE_PUBLIC_URL1}/${src}`;
  };

  return (
    <>
      <div className="py-28">
        <div className="text-center my-11 flex justify-center flex-col gap-7 items-center">
          <h1 className="text-xl lg:text-3xl text-textLightColor dark:text-textDarkColor font-semibold leading-relaxed">
            {route.route.title}
          </h1>
          <p className="text-sm lg:text-xl text-textLightColor dark:text-textDarkColor font-normal w-3/5 leading-relaxed">
            {route.route.details}
          </p>
        </div>
        <div className="mt-11 mx-10">
          <div
            className={`grid grid-flow-row gap-7 ${
              data.length === 1
                ? 'grid-cols-1'
                : data.length === 2
                ? 'grid-cols-1 md:grid-cols-2 justify-center'
                : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            }`}
          >
            {Object.values(data).map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="border min-w-96 dark:shadow-md dark:shadow-white text-textLightColor dark:text-textDarkColor p-4 rounded-xl shadow-xl bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg duration-300 ease-in-out"
              >
                <div className="text-center mb-2">
                  {item.title && <h2 className="text-lg font-semibold">{item.title}</h2>}
                </div>
                <div className="flex justify-center mb-2">
                  {item.image && (
                    <img
                      src={getImageSrc(item.image)}
                      alt={item.title}
                      className="object-contain h-32 md:h-48 pointer-events-none rounded-full"
                    />
                  )}
                </div>
                {item.details && (
                  <p className="text-center text-lg font-normal">{item.details}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default View3;
