import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

const View2 = ({ data }) => {

  // Function to handle local and external image URLs
  const getImageSrc = (src) => {
    if (src.startsWith('http')) {
      return src; // External URL
    }
    return process.env.PUBLIC_URL + src; // Local path
  };

  return (
    <div className='min-h-screen mx-7 px-7 bg-mainLightBg dark:bg-mainDarkBg'>
      <Navbar />
      <div className='pt-28'>
        <div className='flex justify-center items-start flex-col'>
          {Object.values(data).map((item, index) => (
            <div
              key={index}
              className='w-full px-5 lg:w-7/12 dark:shadow-md dark:shadow-white flex justify-center items-center flex-col my-4 shadow-2xl py-12 rounded-3xl bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg transition duration-300 ease-in-out'
            >
              <Link
                to={item.Link}
                className='flex gap-7 flex-row-reverse justify-around items-center w-full'
              >
                <div className='mx-9'>
                  {item.Title && (
                    <p className='my-2 text-center text-2xl text-textLightColor dark:text-textDarkColor font-semibold'>
                      {item.Title}
                    </p>
                  )}
                  {item.Details && (
                    <p className='text-center text-lg text-textLightColor dark:text-textDarkColor font-medium'>
                      {item.Details}
                    </p>
                  )}
                </div>
                {item.Image && (
                  <img
                    src={getImageSrc(item.Image)}
                    alt={item.Title}
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

export default View2;
