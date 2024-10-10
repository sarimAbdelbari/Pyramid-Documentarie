import { Link } from 'react-router-dom';
import {useState , useEffect} from 'react';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';

const View5 = ({route}) => {
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
  

  // console.log("data" , data)

  // const getImageSrc = (src) => {
  //   if (src.startsWith('http')) {
  //     return src;
  //   }
  //   return `${import.meta.env.VITE_PUBLIC_URL1}/${src}`;
  // };

  return (
<>
      <div className="pt-12 h-full">
        <div className="text-center my-11 flex justify-center flex-col gap-14 items-center">
          <h1 className="text-3xl text-textLightColor dark:text-textDarkColor font-semibold leading-relaxed">
            {/* ISO Surface-Mount Technology <br /> (SMT) Standards */}
             {route.title}
          </h1>
          <p className="text-xl text-textSecLightColor dark:text-textDarkColor font-medium w-3/5 leading-relaxed">
             {route.details}
            {/* ISO standards for SMT ensure quality and consistency in electronics
            manufacturing, covering design, assembly, and testing. They help
            reduce defects and enhance product performance, essential for
            meeting international quality benchmarks. */}
          </p>
        </div>
        <div className="mt-24 flex justify-center items-center flex-col gap-7 w-full ">
          <div className="w-full  lg:w-3/4 bg-white dark:bg-secDarkBg rounded-xl shadow-lg dark:shadow-md p-4">
            <div className="grid grid-cols-3 gap-4 text-textLightColor dark:text-textDarkColor">
              <div className="font-semibold text-xl text-start py-4 px-4">Lien</div>
              <div className="font-semibold text-xl text-center py-4 px-4">Auteur</div>
              <div className="font-semibold text-xl text-end py-4 px-4">Date</div>
            </div>
            <div  className="h-96 overflow-y-scroll" >

            {data && data.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 gap-4 p-3 rounded-md ${index % 2 === 0 ? 'bg-mainLightBg dark:bg-mainDarkBg' : 'bg-secLightBg dark:bg-secDarkBg'} transition duration-300 ease-in-out`}
              >
                <Link to={item.path} className="text-blue-500 dark:text-blue-400 hover:underline">
                  {item.title}
                </Link>
                {/* <Link to={item.path} className="text-blue-500 dark:text-blue-400 hover:underline">
                // ? File Name
                {item.path}
                </Link> */}
                <p className="text-center text-textLightColor dark:text-textDarkColor ">{item.title}</p>
                <p className="text-end text-textLightColor dark:text-textDarkColor ">{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
            </div>
        </div>
      </div>
  </>
  );
};

export default View5;
