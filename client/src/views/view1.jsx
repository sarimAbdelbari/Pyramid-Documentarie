import Navbar from '../components/navbar';
import { mainPageImages } from '../data/mainImages';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className='min-h-screen px-7 bg-mainLightBg dark:bg-mainDarkBg'>
      <Navbar />
      <div className='pt-28'>
        <div className='grid grid-flow-row grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-12 place-content-center'>
          {Object.values(mainPageImages).map((data, index) => (
            <div key={index} className='flex justify-center items-center flex-col m-4'>
              <Link
                to={data.Link}
                className='w-72 h-72 gap-2 flex flex-col justify-center items-center rounded-full shadow-2xl dark:shadow-sm dark:shadow-white p-7 bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg transition duration-300 ease-in-out'
              >
                {data.Image && <img src={data.Image} alt={data.Title} className='object-contain h-32 md:h-48' />}
                {data.Title && (
                  <p className='text-center text-xl text-textLightColor dark:text-textDarkColor font-semibold pointer-events-none'>
                    {data.Title}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
