import { useContext, useState } from 'react';
import { BsMoonStarsFill } from 'react-icons/bs';
import { MdOutlineLightMode } from 'react-icons/md';
import { IoMdMore } from 'react-icons/io';
import { ThemeContext } from './themeProvider';
import { useStateContext } from '@/contexts/ContextProvider';
import LogoPngChiali from '../../public/assets/images/LogoPngChiali.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setVisible, userInfo } = useStateContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const Logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="relative mx-8 sticky top-5 z-30 rounded-2xl shadow-lg dark:shadow-md dark:shadow-white py-2 dark:bg-mainDarkBg bg-white">
      <div className="p-3 mx-7 flex justify-between items-center gap-7">
        {/* Logo Section */}
        {userInfo && !userInfo?.active && (
          <Link to="/main">
            <img
              src={LogoPngChiali}
              className="w-14 hover:scale-105 transition-transform duration-300 ease-in-out"
              alt="LogoPngChiali"
              onClick={() => setVisible(true)}
            />
          </Link>
        )}
        {userInfo && userInfo?.active && (
          <IoMdMore
            className="text-4xl   hover:scale-105 font-extrabold hover:text-primary hover:dark:text-primary transition-colors duration-400 ease-in-out text-textlightColor dark:text-textDarkColor cursor-pointer"
            onClick={() => setVisible(true)}
          />
        )}

        {/* Right Section: Theme Toggle & Profile */}
        <div className="flex items-center gap-8 relative">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="transition-transform duration-300 ease-in-out hover:scale-110">
            {theme === 'light' ? (
              <BsMoonStarsFill className="text-3xl text-textlightColor hover:text-primary dark:text-textDarkColor transition-colors duration-400 ease-in-out" />
            ) : (
              <MdOutlineLightMode className="text-4xl font-bold text-textlightColor hover:dark:text-primary dark:text-textDarkColor hover:text-primary transition-colors duration-400 ease-in-out" />
            )}
          </button>

          {/* Profile Image */}
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL1}/profileImage.avif`}
              className="w-14 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
              alt="ProfileImage"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {/* Dropdown Menu */}
            
              <div
                className={`absolute flex flex-col justify-center gap-5 w-64 py-11 px-4 -right-10 top-16 bg-white dark:bg-mainDarkBg shadow-xl rounded-xl rounded-tr-none transform transition-all duration-500 ease-in-out ${
                  isMenuOpen ? 'opacity-100  translate-y-0 visible ' : 'invisible  opacity-0 -translate-y-10'
                }`}
              >
                <p className="text-textlightColor dark:text-textDarkColor font-bold text-primary text-2xl">{userInfo?.userName}</p>
                <p className="text-textSecLightColor  dark:text-textDarkColor font-medium ">{userInfo?.email}</p>
                <p className="text-textLightColor  dark:text-textDarkColor font-medium ">Version 1.0</p>
                <button
                  onClick={Logout}
                  className="text-textlightColor dark:text-textDarkColor font-bold mt-3 bg-primary text-white px-4 py-2 rounded-lg hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-white transition-colors duration-300 ease-in-out"
                >
                  Logout
                </button>
              </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
