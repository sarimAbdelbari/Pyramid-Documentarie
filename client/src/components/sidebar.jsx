import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { PiUsersThin,  PiTreeViewThin, PiCards } from 'react-icons/pi';
import { IoIosLogOut } from 'react-icons/io';
import { IoCreateOutline } from "react-icons/io5";
import { CiViewTable } from 'react-icons/ci';
import { GrUpdate } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import axios from 'axios';
import { FaTimes, FaChevronDown } from "react-icons/fa";
import { TbRouteScan } from "react-icons/tb";
import { MdOutlineLocalPolice } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
export default function SideBar() {
  const [dropdowns, setDropdowns] = useState({
    users: false,
    routes: false,
    permissions: false,
  });

  const navigate = useNavigate();


  useEffect(() => {
    const storedDropdowns = JSON.parse(localStorage.getItem('dropdowns'));
    if (storedDropdowns) {
      setDropdowns(storedDropdowns);
    }
  }, []);
 

  const toggleDropdown = (key) => {
    setDropdowns((prevState) => {
      const newDropdowns = { ...prevState, [key]: !prevState[key] };
      localStorage.setItem('dropdowns', JSON.stringify(newDropdowns));
      return newDropdowns;
    });
  }; 

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='fixed w-1/5 h-[700px] flex flex-col gap-3 justify-between overflow-auto mt-16  rounded-3xl  bg-white dark:bg-mainDarkBg py-4 px-5 z-30 shadow-2xl dark:shadow-white transition-transform duration-700 ease-in-out'>
      <div className='flex flex-col gap-3'>
        <p className='text-md font-medium text-gray-600 dark:text-gray-200 uppercase'>Menu</p>
        <div className='pl-2 flex flex-col gap-1'>
          {/* Dashboard */}
          <Link to='/dashboard/TableauDeBord' className='flex items-center gap-4 text-textSecLightColor dark:text-textDarkColor hover:bg-[#ececfe] dark:hover:text-textLightColor hover:text-primary p-4 rounded-xl transition-colors duration-300'>
            <RxDashboard />
            Tableau de bord
          </Link>

          {/* Users Section */}
          <div className='flex flex-col items-start'>
            <button
              className='flex justify-between items-center w-full p-4 dark:hover:text-textLightColor text-textSecLightColor dark:text-textDarkColor hover:bg-[#ececfe] hover:text-primary rounded-xl transition-colors duration-300'
              onClick={() => toggleDropdown('users')}
            >
              <span className='flex gap-4 items-center'>
                <PiUsersThin />
                Utilisateurs
              </span>
              {dropdowns.users ? <FaTimes /> : <FaChevronDown />}
            </button>
            <div
              className={`pl-4 flex flex-col  w-full transition-all duration-500 overflow-hidden ${
                dropdowns.users ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <Link className='w-full flex items-center gap-3 dark:hover:text-textLightColor hover:bg-[#ececfe] hover:text-primary dark:text-textDarkColor p-4 rounded-xl transition-colors duration-300'>
                <IoCreateOutline />
                Créer
              </Link>
              <Link to='/dashboard/users/table' className='w-full flex items-center gap-3 dark:hover:text-textLightColor hover:bg-[#ececfe] hover:text-primary dark:text-textDarkColor p-4 rounded-xl transition-colors duration-300'>
                <CiViewTable />
                Tableau
              </Link>
            </div>
          </div>

          {/* Routes Section */}
          <div className='flex flex-col gap-4 items-start'>
            <button
              className='flex justify-between items-center w-full p-4 text-textSecLightColor dark:hover:text-textLightColor dark:text-textDarkColor hover:bg-[#ececfe] hover:text-primary rounded-xl transition-colors duration-300'
              onClick={() => toggleDropdown('routes')}
            >
              <span className='flex gap-4 items-center'>
                <TbRouteScan />
                Pages
              </span>
              {dropdowns.routes ? <FaTimes /> : <FaChevronDown />}
            </button>
            <div
              className={`pl-4 flex flex-col gap-3 w-full transition-all duration-500 overflow-hidden ${
                dropdowns.routes ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <Link  className='w-full flex items-center gap-3 dark:hover:text-textLightColor dark:text-textDarkColor hover:bg-[#ececfe] hover:text-primary p-4 rounded-xl transition-colors duration-300'>
                <IoCreateOutline />
                Créer
              </Link>
              <Link to='/dashboard/route/table' className='w-full flex items-center gap-3 dark:hover:text-textLightColor dark:text-textDarkColor hover:bg-[#ececfe] hover:text-primary p-4 rounded-xl transition-colors duration-300'>
                <CiViewTable />
                Tableau
              </Link>
              <Link to='/dashboard/route/tree' className='w-full flex items-center gap-3 dark:hover:text-textLightColor dark:text-textDarkColor hover:bg-[#ececfe] hover:text-primary p-4 rounded-xl transition-colors duration-300'>
                <PiTreeViewThin />
                Arbre
              </Link>
            </div>
          </div>

          {/* Permissions Section */}
          <div className='flex flex-col gap-4 items-start'>
            <button
              className='flex justify-between items-center w-full p-4 text-textSecLightColor dark:hover:text-textLightColor dark:text-textDarkColor hover:bg-[#ececfe] hover:text-primary rounded-xl transition-colors duration-300'
              onClick={() => toggleDropdown('permissions')}
            >
              <span className='flex gap-4 items-center'>
                <MdOutlineLocalPolice />
                Autorisations
              </span>
              {dropdowns.permissions ? <FaTimes /> : <FaChevronDown />}
            </button>
            <div
              className={`pl-4 flex flex-col gap-3 w-full transition-all duration-500 overflow-hidden ${
                dropdowns.permissions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <Link className='w-full flex items-center gap-3 dark:hover:text-textLightColor dark:text-textDarkColor hover:bg-[#ececfe] hover:text-primary p-4 rounded-xl transition-colors duration-300'>
                <IoCreateOutline />
                Créer
              </Link>
              <Link to='/dashboard/groop/table' className='w-full flex items-center gap-3 dark:hover:text-textLightColor dark:text-textDarkColor hover:bg-[#ececfe] hover:text-primary p-4 rounded-xl transition-colors duration-300'>
                <PiCards />
                Cartes
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Application Section */}
      <div className='flex flex-col gap-3'>
        <p className='text-md font-medium text-gray-600 dark:text-gray-200 uppercase'>Application</p>
        <div className='pl-4 flex flex-col '>
          <div className='cursor-pointer flex gap-4 items-center text-textSecLightColor dark:hover:text-textLightColor dark:text-textDarkColor hover:bg-[#ececfe] hover:text-primary p-4 rounded-xl transition-colors duration-300'>
            <GrUpdate />
            Mises à jour
          </div>
          <div className='cursor-pointer flex gap-4 items-center text-textSecLightColor dark:hover:text-textLightColor dark:text-textDarkColor hover:bg-[#ececfe] hover:text-primary p-4 rounded-xl transition-colors duration-300'>
            <IoSettingsOutline />
            Paramètres
          </div>
          <div
            onClick={handleLogout}
            className='cursor-pointer flex gap-4 items-center text-red-600 dark:text-red-400 hover:bg-[#ececfe] hover:text-primary p-4 rounded-xl transition-colors duration-300'
          >
            <IoIosLogOut />
            Déconnexion
          </div>
        </div>
      </div>
    </div>
  );
}
