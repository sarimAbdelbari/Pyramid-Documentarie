import Navbar from '@/components/navbar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect} from 'react';
import LoadingScreen from '@/utils/loadingScreen';

const View4 = ({ route }) => {

  // const [data, setData] = useState([]);
  
  

  console.log("Enter the View 4 Here is the route",route); 

  const getImageSrc = (src) => {
    if (src.startsWith('http')) {
      return src;
    }
    console.log(`${import.meta.env.VITE_PUBLIC_URL1}/${src}`);
    return `${import.meta.env.VITE_PUBLIC_URL1}/${src}`;
  };
 
  useEffect(() => {
    const getViewData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/route`, {
          params: { parrentPathId: route._id }
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getViewData();
  },[route])

  // ? this  : public/assets/images/Finance.png
  // ? other : public/assets/images/Finance.png

  return (
    <div className='min-h-screen px-7 bg-mainLightBg dark:bg-mainDarkBg'>
      <Navbar />
      {route ? (
        <div className='pt-28'>
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-12 place-content-center">
          {Object.values(route).map((data, index) => (
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
      
    </div>
  );
};

View4.propTypes = {
  data: PropTypes.object.isRequired,
};
export default View4;
