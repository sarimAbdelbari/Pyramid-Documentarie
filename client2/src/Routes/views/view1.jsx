import { Link } from 'react-router-dom';
import { useState ,useEffect  } from 'react';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';

const View1 = ({route}) => {
  const [data, setData] = useState([]);

 
  const {routeData} = useStateContext();




 useEffect(() => {
   const getViewData = async () => {
     try {
        

       const response = await axios.get(
         `${import.meta.env.VITE_API_URL}/route/parrentId/${route._id}`
       );

       
       // Extract the IDs from response.data
       const responseIds = response.data.map((item) => item._id);

       
       const routes = routeData.map((route) => route);
       
       // Filter routes based on whether their _id is in the responseIds array
       const newRoutes = routes.filter((route) => responseIds.includes(route._id));


       
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
      <div className='pt-12'>
        <div className='flex  items-center justify-around flex-wrap gap-7'>
        {/* <div className='grid grid-flow-row  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-7 place-content-center'> */}
          {Object.values(data).map((data, index) => (
            <div key={index} className='flex justify-center items-center flex-col m-4 '>
              <Link
                to={data.path}
                className='xl:w-96 xl:h-96 lg:h-80 lg:w-80  w-72 h-72 gap-2 flex flex-col justify-center items-center rounded-full shadow-2xl dark:shadow-md dark:shadow-white p-7 bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg transition duration-300 ease-in-out'
              >
                {data.image && (
                  <img
                    src={getImageSrc(data.image)}
                    alt={data.title}
                    className='object-contain h-36 lg:h-40 xl:h-48  pointer-events-none rounded-xl '
                  />
                )}
                {data.title && (
                  <p className='text-center text-xl text-textLightColor dark:text-textDarkColor font-semibold pointer-events-none'>
                    {data.title}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
</>

  );
};

export default View1;
