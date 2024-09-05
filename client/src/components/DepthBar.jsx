import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const DepthBar = () => {
  const [pathArray, setPathArray] = useState([]);
  const location = useLocation(); // Hook to get the current location

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
    <div className="fixed z-50 bottom-5 right-5 bg-white text-textLightColor dark:bg-secDarkBg dark:text-textDarkColor dark:shadow-white p-6 rounded-2xl shadow-lg flex justify-center items-center gap-2">
      <Link to="/main" className='text-2xl cursor-pointer mx-3'>
        <FaHome />
      </Link>
      {pathArray.map((path, index) => {
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
      })}
    </div>
  );
};

export default DepthBar;
