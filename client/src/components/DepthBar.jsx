import { useEffect, useState } from 'react';
import { Link, useLocation ,useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaAngleLeft ,FaAngleRight  } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";


const DepthBar = () => {
  const [pathArray, setPathArray] = useState([]);
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate();
  const fetchPath = () => {
    // Get the current path from the location
    const depth = location.pathname;
    
    // Split the path into an array by "/"
    setPathArray(depth.split('/').filter(Boolean));
  };

  useEffect(() => {
    fetchPath(); // Fetch path whenever the location changes
  }, [location]); // Dependency on location

  return (
    <div className="fixed z-50 bottom-5  right-5 bg-white text-textLightColor dark:bg-secDarkBg dark:text-textDarkColor dark:shadow-white p-6 rounded-2xl shadow-lg flex justify-center items-center gap-5">
      {location.pathname !== '/main' ? <FaAngleLeft onClick={() => navigate(-1)}  className='text-2xl text-textSecLightColor dark:text-textDarkColor cursor-pointer hover:text-darkPrimary' /> : null}
      {/* <FaAngleLeft  onClick={() => navigate(-1)} className=" text-2xl text-textSecLightColor dark:text-textDarkColor cursor-pointer hover:text-darkPrimary" /> */}
      {/* <MdOutlineKeyboardDoubleArrowUp className='absolute top-1   text-2xl text-textSecLightColor dark:text-textDarkColor cursor-pointer hover:text-darkPrimary'/> */}

      <Link to="/main" className='text-2xl cursor-pointer mx-3 pt-2 hover:text-darkPrimary'>
        <FaHome className='text-2xl text-textLightColor dark:text-textDarkColor cursor-pointer hover:text-darkPrimary' />
      </Link>
      <FaAngleRight  onClick={() => navigate(+1)} className=" text-2xl text-textSecLightColor hover:text-darkPrimary dark:text-textDarkColor cursor-pointer" />

      {/* {pathArray.map((path, index) => {
        // Create the path for each breadcrumb link
        const pathLink = `/${pathArray.slice(0, index + 1).join('/')}`;

        return (
          <span key={index} className='text-lg font-medium text-primary hover:text-secDarkBg dark:text-white dark:font-normal'>
            <Link to={pathLink} className="hover:underline cursor-pointer">
              {path}
            </Link>
            {index < pathArray.length - 1 && ' / '}
          </span>
        );
      })} */}
    </div>
  );
};

export default DepthBar;
