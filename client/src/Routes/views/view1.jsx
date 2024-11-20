import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';

const View1 = ({ route ,preview}) => {
  const [data, setData] = useState([]);
  const { routeData } = useStateContext();


  useEffect(() => {
    const getViewData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/route/parrentId/${route._id}`
        );

        // Extract the IDs from response.data
        
        if(!preview){
          // Filter routes based on whether their _id is in the responseIds array
          const responseIds = response.data.map((item) => item._id);
          const newRoutes = routeData.filter((route) => responseIds.includes(route._id));
          setData(newRoutes);
          
        } else {
          
          setData(response.data);
        }
      } catch (error) {
        
        console.error(error);
      } finally {
        
      }
    };

    getViewData();
  }, [route, routeData ,preview]);

  const getImageSrc = (src) => {
    return src ? `${import.meta.env.VITE_PUBLIC_URL1}/${src}` : `${import.meta.env.VITE_PUBLIC_URL1}/imageHolder.jpg` ;
  };

  return (
    <div className='pt-20'>
      <div className='flex items-center justify-around flex-wrap gap-7'>
        {data.map((item, index) => (
          <div key={index} className='flex justify-center items-center flex-col m-4'>
            <Link
              to={item.path}
              className='xl:w-80 xl:h-80 lg:h-72 lg:w-72 w-72 h-72 flex flex-col justify-center items-center rounded-full shadow-2xl dark:shadow-md dark:shadow-white p-7 bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg transition duration-300 ease-in-out'
            >
              {item.image && (
                <img
                  src={getImageSrc(item.image)}
                  alt={item.title}
                  className='object-contain h-32 lg:h-36 xl:h-44 rounded-xl pointer-events-none'
                />
              )}
              {item.title && (
                <p className='text-center text-lg text-textLightColor dark:text-textDarkColor font-semibold pointer-events-none'>
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
