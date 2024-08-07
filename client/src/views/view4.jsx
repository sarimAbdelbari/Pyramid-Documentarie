import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const View4 = ({ data }) => {

  const getImageSrc = (src) => {
    if (src.startsWith('http')) {
      return src;
    }
    console.log(`${import.meta.env.VITE_PUBLIC_URL1}/${src}`);
    return `${import.meta.env.VITE_PUBLIC_URL1}/${src}`;
  };
 
  // ? this  : public/assets/images/Finance.png
  // ? other : public/assets/images/Finance.png

  return (
    <div className='min-h-screen px-7 bg-mainLightBg dark:bg-mainDarkBg'>
      <Navbar />
      <div className='pt-28'>
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-12 place-content-center">
          {Object.values(data).map((data, index) => (
            <div
              key={index}
              className='flex justify-center items-center flex-col m-4 rounded-3xl shadow-2xl p-7 dark:shadow-md dark:shadow-white bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg transition duration-300 ease-in-out'
            >
              <Link to={data.Link} className='w-full h-80 flex gap-7 justify-around items-center'>
                <div className='mx-9'>
                  {data.Title && (
                    <p className='my-2 text-center text-2xl text-textLightColor dark:text-textDarkColor font-semibold'>
                      {data.Title}
                    </p>
                  )}
                  {data.Details && (
                    <p className='text-center text-lg text-textLightColor dark:text-textDarkColor font-medium'>
                      {data.Details}
                    </p>
                  )}
                </div>
                {data.Image && (
                  <img
                    src={getImageSrc(data.Image)}
                    alt={data.Title}
                    className='object-contain h-32 md:h-48 pointer-events-none rounded-xl'
                  />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

View4.propTypes = {
  data: PropTypes.object.isRequired,
};
export default View4;
