import { Link } from 'react-router-dom';
import { useState ,useEffect  } from 'react';
import axios from 'axios';
const Main = (route) => {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    const getViewData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/route/parrentId/${route.route._id}`);

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
        <div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-7 place-content-center'>
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

export default Main;
