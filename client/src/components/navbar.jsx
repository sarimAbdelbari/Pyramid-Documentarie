import { useContext, useState } from 'react';
import { BsMoonStarsFill } from 'react-icons/bs';
import { MdOutlineLightMode, MdOutlineAddComment } from 'react-icons/md';
import {  IoIosSearch, IoMdNotificationsOutline } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { ThemeContext } from '@/contexts/themeProvider';
import { useStateContext } from '@/contexts/ContextProvider';
import LogoPngChiali from '/assets/images/LogoPngChiali.webp';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import Button from "@/components/button";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setVisible, userInfo } = useStateContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <div onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isMenuOpen ? 'fixed inset-0 bg-gray-600 bg-opacity-50 shadow-xl flex items-center justify-center z-40' : 'hidden'} `}></div>

    <nav className=" sticky top-5 z-40 py-2 bg-white dark:bg-mainDarkBg shadow-md rounded-full  transition-colors duration-300">
      
      <div className="flex justify-between items-center px-4 lg:px-7">
        {/* Logo Section */}
        <Link to="/principal" className="flex items-center gap-4 flex-1" onClick={() => setVisible(true)}>
          <img
            src={LogoPngChiali}
            className="w-12 md:w-16 hover:scale-105 transition-transform object-contain"
            alt="LogoPngChiali"
          />
        </Link>

        {/* Search, Email, Notification */}
        <div className="items-center hidden lg:flex  gap-4 flex-1 mx-4 lg:mx-8">
          <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-700 py-2 px-4 rounded-full">
            <IoIosSearch className="text-xl text-gray-500  " />
            <input
              className="w-full bg-transparent focus:outline-none ml-2"
              type="text"
              placeholder="Recherche"
            />
          </div>
          <MdOutlineAddComment className="text-4xl text-gray-500 dark:text-gray-300 p-2 rounded-full cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600" />
          <IoMdNotificationsOutline className="text-4xl text-gray-500 dark:text-gray-300 p-2 rounded-full cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600" />
        </div>

        {/* Profile & Theme Toggle */}
        <div className="relative flex items-center gap-4">
          {/* Profile */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL1}/profileImage.avif`}
              className="w-10 md:w-12 rounded-full object-contain"
              alt="Profile"
            />
            <div className="hidden md:flex flex-col text-left">
              <p className="text-sm font-bold text-gray-800 dark:text-white">
                {userInfo?.userName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userInfo?.admin ? 'Admin' : 'User'}
              </p>
            </div>
            <RiArrowDropDownLine className="text-2xl md:text-3xl text-gray-500 dark:text-gray-300" />
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
      </div>
    </nav>
    </>
  );
};

export default Navbar;
