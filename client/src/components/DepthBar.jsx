import { Link, useLocation ,useNavigate } from 'react-router-dom';
import { TiHomeOutline } from "react-icons/ti";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";


const DepthBar = () => {
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate();

  return (
    <div className="fixed z-50 bottom-5  right-5 bg-white text-textLightColor dark:bg-secDarkBg dark:text-textDarkColor dark:shadow-white p-6 rounded-2xl shadow-lg flex justify-center items-center gap-5">
      {location.pathname !== '/principal' ? <MdKeyboardArrowLeft  onClick={() => navigate(-1)}  className='text-2xl text-textSecLightColor dark:text-textDarkColor cursor-pointer hover:text-darkPrimary  hover:scale-125 ease-in-out duration-300' /> : null}

      <Link to="/principal" className='text-2xl cursor-pointer mx-3 text-textSecLightColor  hover:text-darkPrimary  hover:scale-125 ease-in-out duration-300 '>
        <TiHomeOutline   className='text-2xl text-textLightColor dark:text-textDarkColor cursor-pointer hover:text-darkPrimary' />
      </Link>
      <MdKeyboardArrowRight   onClick={() => navigate(+1)} className=" text-2xl text-textSecLightColor hover:text-darkPrimary dark:text-textDarkColor cursor-pointer  hover:scale-125 ease-in-out duration-300" />

      
    </div>
  );
};

export default DepthBar;
