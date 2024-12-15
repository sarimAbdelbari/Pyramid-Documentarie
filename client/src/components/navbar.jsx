import { useContext, useState  ,useEffect } from 'react';
import { BsMoonStarsFill } from 'react-icons/bs';
import { MdOutlineLightMode, MdOutlineAddComment } from 'react-icons/md';
import {  IoIosSearch, IoMdNotificationsOutline } from 'react-icons/io';
import { ThemeContext } from '@/contexts/themeProvider';
import { useStateContext } from '@/contexts/ContextProvider';
import LogoPngChiali from '/assets/images/LogoPngChialiBlack-removebg-preview.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import Button from "@/components/button";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setVisible, userInfo ,setIsLoading } = useStateContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      // Format the date: "Tuesday, December 3, 2024"
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setCurrentDate(formattedDate);
    };

    updateDate();
  }, [])
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
      window.location.href = '/login';
    } catch (error) {
      setIsLoading(false)
      console.error('Error logging out:', error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <div onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isMenuOpen ? 'fixed inset-0 bg-gray-600 bg-opacity-50 shadow-xl flex items-center justify-center z-30' : 'hidden'} `}></div>

    <nav className="sticky top-0 left-0 z-40 bg-secLightBg  py-3 border-b-[1px] transition-colors duration-300 px-3 lg:px-6">
      
      <div className="flex items-center justify-between ">
        {/* Logo Section */}
        <Link to="/principal" className="flex items-center gap-1 w-1/5  " onClick={() => setVisible(true)}>
          <img
            src={LogoPngChiali}
            className="w-12 md:w-16 h-full  hover:scale-105 transition-transform object-contain"
            alt="LogoPngChiali"
          />
           <h3 className='text-lg text-textLightColor font-semibold text-nowrap font-serif'>Pyrmid Doc</h3>
        </Link>

        {/* Profile & Theme Toggle */}
        <div className="relative flex items-center gap-4">
          {/* Profile */}
          <div
            className="flex items-center gap-5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL1}/profileImage.webp`}
              className="w-10 md:w-14 h-full rounded-full object-contain"
              alt="Profile"
            />
            <div className="hidden md:flex flex-col text-left">
              <p className="text-md font-semibold text-textLightColor dark:text-white">
                Salut {userInfo?.userName}
              </p>
              
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
               {currentDate}
              </p>
            </div>
          </div>

          {/* Dropdown Menu */}
          <div
            className={`absolute top-16 right-0 mt-2 w-56 bg-white dark:bg-mainDarkBg rounded-xl shadow-lg transform transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
            }`}
          >
            <div className="p-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {userInfo?.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Version 1.0</p>
              <div className='mt-4 w-full text-center px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"'>

              <MdOutlineAddComment className="text-xl text-gray-600 dark:text-gray-200" />
              </div>
              <div className='mt-4 w-full text-center px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"'>
              <IoMdNotificationsOutline className="text-xl text-gray-600 dark:text-gray-200" />
              </div>
              <button
                onClick={toggleTheme}
                className="mt-4 w-full text-center px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {theme === 'light' ? (
                  <BsMoonStarsFill className="text-xl text-gray-600 dark:text-gray-200" />
                ) : (
                  <MdOutlineLightMode className="text-2xl text-gray-600 dark:text-gray-200" />
                )}
              </button>
              <div onClick={() => handleLogout()}  className='mt-4 w-full  '>
              <Button Text="Déconnexion" Icon={<IoIosLogOut className="text-xl text-textDarkColor hover:text-textLightColor  dark:text-gray-200 hover:dark:text-textLightColor" />} />

              </div>
             
            </div>
          </div>
        </div>
        {/* Search, Email, Notification */}
        <div className="items-center hidden lg:flex  gap-4 flex-1  justify-end">
          <div className=" flex items-center bg-white dark:bg-gray-700 py-2 px-4 min-w-96 rounded-full">
            <IoIosSearch className="text-xl text-gray-500  " />
            <input
              className="w-full pl-2 focus:outline-none ml-2"
              type="text"
              placeholder="Recherche"
            />
          </div>
          <div className='bg-white dark:bg-mainDarkBg hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-full'> 

          <MdOutlineAddComment className="text-xl text-gray-700 dark:text-gray-300  rounded-full cursor-pointer " />
          </div>
          <div className='bg-white dark:bg-mainDarkBg hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-full'>
          <IoMdNotificationsOutline className="text-xl text-gray-700 dark:text-gray-300 rounded-full cursor-pointer " />

          </div>
        </div>

      </div>
    </nav>
    </>
  );
};

export default Navbar;