import React, {useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import LogoPngChiali from "../assets/images/LogoPngChiali.png";
import { Link } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";
import { MdOutlineLocalPolice } from "react-icons/md";
import { FaTimes, FaHome, FaBookmark, FaUser, FaTable, FaSearch, FaUsers, FaCalendar, FaChartBar, FaCog, FaChevronDown } from "react-icons/fa";
import { SiPowerpages } from "react-icons/si";

export default function SideBar() {
    const { visible, setVisible } = useStateContext();
    const { dropdowns, setDropdowns } = useStateContext();
    
   

    const toggleDropdown = (key) => {
        setDropdowns(prevState => ({ ...prevState, [key]: !prevState[key] }));
    };

    return (
        <div className={`fixed inset-0 z-50 shadow-2xl dark:shadow-lg dark:shadow-white transition-transform duration-700 ease-in-out  ${visible ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
        <div className="flex relative flex-row-reverse ">
        <div className={`w-full bg-[#0e0e0e4d] transition-transform duration-700 ease-in-out  ${visible ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'} `} onClick={() => setVisible(false)}></div>
        <div className="w-3/5 lg:w-1/3  flex flex-col text-textlightColor dark:text-textDarkColor bg-mainLightBg  dark:bg-mainDarkBg h-screen   shadow-2xl dark:shadow-lg dark:shadow-white"> {/* Change min-h-screen to h-full and add overflow-y-auto */}
            <div className="flex items-center justify-between p-4 ">
                <Link to="/dashboard" className="flex items-center gap-2">
                            <img src={LogoPngChiali} className='w-16' alt='LogoPngChiali' />
                            <span className="font-semibold text-2xl">Groop Chiali</span>
                        </Link>
                        <button onClick={() => setVisible(false)}>
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                    <div className="overflow-y-scroll  flex-1">
                        <ul className="p-3 space-y-2">
                            <li>
                                <div className="p-3 flex justify-between items-center cursor-pointer" onClick={() => toggleDropdown('favorites')}>
                                <p className='flex justify-center items-center text-lg font-medium'>FAVORITES</p>

                                    {dropdowns.favorites ? <FaTimes className="text-sm" /> : <FaChevronDown className="text-sm" />}
                                </div>
                                <ul className={`space-y-2 ${dropdowns.favorites ? '' : 'hidden'}`}>
                                    <li>
                                        <Link to="/dashboard" className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                            <FaHome className="mr-2" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/Bookmarks" className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                            <FaBookmark className="mr-2" />
                                            <span>Bookmarks</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="p-3 flex justify-between items-center cursor-pointer" onClick={() => toggleDropdown('users')}>
                                        <p className='flex justify-center items-center text-lg  font-medium'><span className='mr-2 '><FaUser /></span> Users </p>

                                            {dropdowns.users ? <FaTimes className="text-sm" /> : <FaChevronDown className="text-sm" />}
                                        </div>
                                        <ul className={`space-y-2 pl-4 ${dropdowns.users ? '' : 'hidden'}`}>
                                            <li>
                                                <Link to="/dashboard/Users" className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                                    <FaTable className="mr-2" />
                                                    <span>View</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                                    <FaSearch className="mr-2" />
                                                    <span>Search</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div className="p-3 flex justify-between items-center cursor-pointer" onClick={() => toggleDropdown('pages')}>
                                            <p className='flex justify-center items-center text-lg  font-medium'><span className='mr-2 '><SiPowerpages  /></span> Pages</p>

                                            {dropdowns.pages ? <FaTimes className="text-sm" /> : <FaChevronDown className="text-sm" />}
                                        </div>
                                        <ul className={`space-y-2 pl-4 ${dropdowns.pages ? '' : 'hidden'}`}>
                                            <li>
                                                <Link className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                                    <FaTable className="mr-2" />
                                                    <span>View</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                                    <FaSearch className="mr-2" />
                                                    <span>Search</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div className="p-3 flex justify-between items-center cursor-pointer" onClick={() => toggleDropdown('permissions')}>
                                            
                                            <p className='flex justify-center items-center text-lg font-medium'><span className='mr-2 '><MdOutlineLocalPolice /></span> Permissions</p>
                                            {dropdowns.permissions ? <FaTimes className="text-sm" /> : <FaChevronDown className="text-sm" />}
                                        </div>
                                        <ul className={`space-y-2 pl-4 ${dropdowns.permissions ? '' : 'hidden'}`}>
                                            <li>
                                                <Link className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                                    <FaTable className="mr-2" />
                                                    <span>View</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                                    <FaSearch className="mr-2" />
                                                    <span>Search</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                            <FaUsers className="mr-2" />
                                            <span>Team</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                            <FaCalendar className="mr-2" />
                                            <span>Calendar</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="p-3 space-y-2">
                            <li>
                                <div className="p-3 flex justify-between items-center cursor-pointer" onClick={() => toggleDropdown('application')}>
                                    <span>APPLICATION</span>
                                    {dropdowns.application ? <FaTimes className="text-sm" /> : <FaChevronDown className="text-sm" />}
                                </div>
                                <ul className={`space-y-2 ${dropdowns.application ? '' : 'hidden'}`}>
                                    <li>
                                        <Link className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                            <GrUpdate className="mr-2" />
                                            <span>Updates</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                            <FaChartBar className="mr-2" />
                                            <span>Performance</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="flex items-center p-3 rounded hover:bg-gray-300 hover:dark:bg-gray-700">
                                            <FaCog className="mr-2" />
                                            <span>Settings</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="p-3">
                        <hr className="border-gray-700 mb-3" />
                        <div className="flex items-center p-3 gap-4 rounded cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-700">
                            <img src="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" className="w-12 h-12 rounded-full" alt="Amy Elsner" />
                            <span className="font-bold">Amy Elsner</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
