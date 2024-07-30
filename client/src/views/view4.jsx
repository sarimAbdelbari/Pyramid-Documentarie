import React from 'react';
import Navbar from '../components/navbar';
import { mainPageImages, View4Data } from '../data/mainImages';
import { Link } from 'react-router-dom';

import SME from "../assets/images/SME.png";
import SMQ from "../assets/images/SMQ.png";
import SMSST from "../assets/images/SMSST.png";
import Certification from "../assets/images/Certification.png";
import imageHolder from "../assets/images/imageHolder.jpg";
import Dispostions from "../assets/images/Dispostions.png";
import Formations from "../assets/images/Formations.png";
import NormsISo from "../assets/images/normsISo.png";

const View4 = () => {
  return (
    <div className='min-h-screen px-7 bg-mainLightBg dark:bg-mainDarkBg'>
      <Navbar />
      <div className='pt-28'>
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-12 place-content-center">
          {Object.values(View4Data).map((data, index) => (
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
                    src={data.Image}
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

export default View4;
