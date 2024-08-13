import { Link } from 'react-router-dom';
import {useState , useEffect} from 'react';
import axios from 'axios';
const View2 = ( route ) => {


  const [data, setData] = useState([]);
  console.log("route id",route.route._id);
  
  useEffect(() => {
    const getViewData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/route/parrentId/${route.route._id}`);

        console.log("response.data",response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getViewData();
  },[route])


  const getImageSrc = (src) => {
    if (src.startsWith('http')) {
      return src;
    }
    
    return `${import.meta.env.VITE_PUBLIC_URL1}/${src}`;
  };

  return (
    <>
      <div className='py-28'>
        <div className='flex justify-center items-start flex-col'>
          {Object.values(data).map((item, index) => (
            <div
              key={index}
              className='w-full px-5 lg:w-7/12 dark:shadow-md dark:shadow-white flex justify-center items-center flex-col my-4 shadow-2xl py-12 rounded-3xl bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg transition duration-300 ease-in-out'
            >
              <Link
                to={item.path}
                className='flex gap-7 flex-row-reverse justify-around items-center w-full'
              >
                <div className='mx-9'>
                  {item.title && (
                    <p className='my-2 text-center text-2xl text-textLightColor dark:text-textDarkColor font-semibold'>
                      {item.title}
                    </p>
                  )}
                  {item.details && (
                    <p className='text-center text-lg text-textLightColor dark:text-textDarkColor font-medium'>
                      {item.details}
                    </p>
                  )}
                </div>
                {item.image && (
                  <img
                    src={getImageSrc(item.image)}
                    alt={item.title}
                    className='object-contain h-32 md:h-48 pointer-events-none rounded-xl'
                  />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
  </>
  );
};


export default View2;
