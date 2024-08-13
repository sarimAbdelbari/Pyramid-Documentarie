import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect ,useState} from 'react';
import LoadingScreen from '@/utils/loadingScreen';

const View4 = ( route ) => {

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

  // ? this  : public/assets/images/Finance.png
  // ? other : public/assets/images/Finance.png

  return (
<>
      {data ? (
        <div className='py-28'>
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-12 place-content-center">
          {Object.values(data).map((data, index) => (
          {/* ? Here You Put Data Instad {Object.values(data).map((data, index) => ( */},
            <div
              key={index}
              className='flex justify-center items-center flex-col m-4 rounded-3xl shadow-2xl p-7 dark:shadow-md dark:shadow-white bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg transition duration-300 ease-in-out'
            >
              <Link to={data.path} className='w-full h-80 flex gap-7 justify-center items-center'>
                <div >
                  {data.title && (
                    <p className='my-2 text-center text-2xl text-textLightColor dark:text-textDarkColor font-semibold'>
                      {data.title}
                    </p>
                  )}
                  {data.details && (
                    <p className='text-center text-lg text-textLightColor dark:text-textDarkColor font-medium'>
                      {data.details}
                    </p>
                  )}
                </div>

                {data?.image && (
                <div>
                  <img
                  src={getImageSrc(data?.image)}
                  alt={data?.title}
                  className='object-contain h-32 md:h-48 pointer-events-none rounded-xl'
                  />
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
      ) : <LoadingScreen/>}
      
      </>
  );
};


export default View4;
