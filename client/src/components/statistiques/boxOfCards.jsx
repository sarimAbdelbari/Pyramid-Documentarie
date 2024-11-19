import React, { useEffect ,useRef,useState } from 'react'
import { FaUncharted } from "react-icons/fa6";
import { TbUsersGroup } from "react-icons/tb";
import { LiaUsersSolid } from "react-icons/lia";
import useFetchData from '@/hooks/useFetchData';
import { FcExpired } from "react-icons/fc";
import { FcDocument } from "react-icons/fc";

const BoxOfCards =  () => {


    const [usersStats, setUsersStats] = useState({});
    const fileStats = useRef({ expired : '' , norms : ''});

    const { data, loading, error } =  useFetchData(`${import.meta.env.VITE_API_URL}/stats/user`);

    const { data:data2, loading:loading2, error:error2 } =  useFetchData(`${import.meta.env.VITE_API_URL}/route/files`);
 


    
    useEffect(()=>{

        if (data2 && data2.length > 0) {
        //  Organize and count data by type
        let Expired =[];
        let Norms =[];
        let CurrentDate = new Date();

        data2.map((d) => {
              
               let ExpierdDate = new Date(d.expiredate);

            
           
              if(ExpierdDate < CurrentDate){
  
                Expired.push(d)
                
              } else {
                Norms.push(d)
                
              }
     

         })
            
         fileStats.expired = Expired.length 
         fileStats.norms = Norms.length
        }


        setUsersStats(data);
        
    },[data])
    
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div> <div className="w-full">
    <div className="mx-5 shadow-2xl bg-lightCyen dark:shadow-white rounded-lg dark:bg-mainDarkBg flex justify-around items-center flex-wrap gap-4 p-5 ">
      {/* Active Users */}
      <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-center gap-3  text-lg font-semibold text-textLightColor dark:text-white">
          <p className="text-lg ">Nombre de  Utilisateurs</p>
          <FaUncharted className="text-xl" />
        </div>
        <div className="flex items-center gap-4 text-xl font-medium text-blue-600 dark:text-blue-400">
          <LiaUsersSolid  />
          <p>{usersStats?.totalUsers}</p>
        </div>
      </div>
      <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-center gap-3 text-lg font-semibold text-textLightColor dark:text-white" >
          <p className="text-lg ">Nombre De Document
          Norm</p>
          <FaUncharted className="text-xl " />
        </div>
        <div className="flex items-center gap-4 text-xl font-medium text-green-600 dark:text-cyan-400">
          <FcDocument />
          <p>{fileStats?.norms}</p>
        </div>
      </div>
      
      {/* Deactivated Users */}
      <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-center gap-3   text-lg font-semibold text-textLightColor dark:text-white">
          <p className="text-lg ">Nombre De Document Expirée</p>
          <FaUncharted className="text-xl " />
        </div>
        <div className="flex items-center gap-4 text-xl font-medium text-red-600 dark:text-red-400">
          <FcExpired />
          <p>{fileStats?.expired}</p>
        </div>
      </div>
  
      {/* Common Group */}
      <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-center gap-3  text-lg font-semibold text-textLightColor dark:text-white">
          <p className="text-lg ">Groupe commun</p>
          <FaUncharted className="text-xl " />
        </div>
        <div className="flex items-center gap-4 text-xl font-medium text-purple-600 dark:text-purple-400">
          <TbUsersGroup />
          <p>{usersStats?.numberOftheMostCommunGroop}  {usersStats?.most_common_groop?.groopName}</p>
       
        </div>
      </div>
  
    
    </div>
  </div></div>
  )
}

export default BoxOfCards;