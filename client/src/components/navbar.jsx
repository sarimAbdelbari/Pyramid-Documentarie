import { useContext } from 'react'
import { BsMoonStarsFill } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { ThemeContext } from './themeProvider';
import { MdOutlineLightMode } from "react-icons/md";
import { useStateContext } from '../contexts/ContextProvider';
import { RiMenuFold2Fill } from "react-icons/ri";
import LogoPngChiali from '../../public/assets/images/LogoPngChiali.png';
const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const { setVisible } = useStateContext()
 
  return (
    <div className='fixed top-0 left-0 z-30 w-full  shadow-xl dark:shadow-md dark:shadow-white py-2 dark:bg-mainDarkBg bg-mainLightBg' >
      <div className='p-3 mx-7 flex justify-between items-center gap-7'>
        <img src={LogoPngChiali} className='w-14' alt='LogoPngChiali' onClick={() => setVisible(true)}/>
          {/* <RiMenuFold2Fill  className='text-4xl hover:text-white font-bold text-textlightColor dark:text-textDarkColor  cursor-pointer' onClick={() => setVisible(true)}/> */}
        <div className='flex items-center gap-11'> 
          <button onClick={toggleTheme}>
            {theme === 'light' ? <BsMoonStarsFill className='text-3xl text-textlightColor hover:dark:text-primary dark:text-textDarkColor hover:text-primary duration-300 ease-in-out   '/> 
            :  <MdOutlineLightMode className='text-4xl font-bold text-textlightColor hover:dark:text-primary dark:text-textDarkColor hover:text-primary duration-300 ease-in-out' />}
          </button>
          <FaRegUserCircle className='text-4xl hover:text-primary hover:dark:text-primary duration-300 ease-in-out font-bold text-textlightColor dark:text-textDarkColor  cursor-pointer' />
         

        </div>
      </div>
    </div>
  )
}

export default Navbar
