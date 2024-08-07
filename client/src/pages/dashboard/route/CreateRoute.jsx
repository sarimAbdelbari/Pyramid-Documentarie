import Navbar from '@/components/navbar';
import SideBar from '@/components/sidebar';
import LoadingScreen from '@/utils/loadingScreen'

const CreateRoute = () => {
  return (
    <div className="absolute top-0 left-0 h-full w-full  dark:bg-mainDarkBg bg-mainLightBg z-50">
    <div className='flex justify-center items-center'>

       <div className='text-3xl h-screen w-full p-6 rounded-2xl bg-mainLightBg dark:bg-secDarkBg text-textLightColor dark:text-textDarkColor font-semibold'>
        <div className='flex flex-col gap-10 justify-center items-center'>

         <h3 className=""> Create Route</h3> 
        <div>
        <input type="text " name="route" className="p-3 rounded-xl  " placeholder="Select a Route"/>
        </div>
        <p className='p-3'>
         Select a View
        </p>
       </div>
        </div>

    </div>
    </div>
  )
}

export default CreateRoute;