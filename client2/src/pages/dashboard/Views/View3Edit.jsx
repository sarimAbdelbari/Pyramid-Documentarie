import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ViewData } from "@/data/DataForm";

const View3Edit = (route) => {
  const [data, setData] = useState([]);

 

  console.log("first" ,route)
  console.log("ViewData" ,ViewData)



 useEffect(() => {
   const getViewData = async () => {
     try {
        

       const response = await axios.get(
         `${import.meta.env.VITE_API_URL}/route/parrentId/${route.route._id}`
       );

        console.log("response" , response.data)

       
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
    <div >
        <div className="text-center my-11 flex justify-center flex-col gap-7 items-center">
          <h1 className="text-xl lg:text-3xl text-textLightColor dark:text-textDarkColor font-semibold leading-relaxed">
            <input type='text' placeholder={route?.route?.title ||'Title'} className='text-xl p-3 lg:text-3xl text-textLightColor dark:text-textDarkColor font-semibold leading-relaxed'/>
          </h1>
          <textarea placeholder={route?.route?.description ||'Description'} className="text-md lg:text-xl text-textSecLightColor dark:text-textDarkColor font-normal w-3/5 leading-relaxed p-3">
          Les détails du parcours se cachent dans chaque choix et chaque détour. Ce sont ces petites nuances qui façonnent notre voyage.
          </textarea>
        </div>
        <div className="mt-11 mx-10">
          <div
            className={`grid grid-flow-row gap-7 place-items-center ${
              data.length === 1
                ? 'grid-cols-1'
                : data.length === 2
                ? 'grid-cols-1 md:grid-cols-2 justify-center'
                : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            }`}
          >
            {Object.values(ViewData).map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="border w-full max-w-md h-full flex flex-col gap-5 dark:shadow-md dark:shadow-white text-textLightColor dark:text-textDarkColor p-4 rounded-xl shadow-xl bg-mainLightBg dark:bg-secDarkBg hover:bg-secLightBg dark:hover:bg-mainDarkBg duration-300 ease-in-out"
              >
                <div className="text-center mb-2">
                  {item.title && <h2 className="text-lg font-semibold">{item.title}</h2>}
                </div>
                <div className="flex justify-center mb-2">
                  {item.image && (
                    <img
                      src={getImageSrc(item.image)}
                      alt={item.title}
                      className="object-contain h-32 md:h-48 pointer-events-none rounded-full"
                    />
                  )}
                </div>
                {item.details && (
                  <p className="text-center text-textSecLightColor text-lg font-normal">{item.details}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
  )
}

export default View3Edit