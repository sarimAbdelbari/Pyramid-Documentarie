import { useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';

const useRouteAuth = () => {
  const { routeData, setRouteData, userInfo , setIsLoading} = useStateContext();


  useEffect(() => {

     

    if (!userInfo.groop) {
      return;
    }

    if(userInfo.groop.length === 0){

      return;
    }
    const getData = async () => {
      
      try {
 
        setIsLoading(true)
        const responseGroop = await axios.post(`${import.meta.env.VITE_API_URL}/groop/all` ,{
          groupsIds: userInfo?.groop
        });
        
        if(responseGroop.length === 0){
          return;
        }
         

          const AllRoute = responseGroop.data.map((route)=>{
           return route.groopRoutes;
          })
          const routes = AllRoute.flat().map((route)=>{
            return route.route;
          })
           
  
          if(routes.length ===0) {
            return;
          }

        const responseRoutes = await axios.post(`${import.meta.env.VITE_API_URL}/route/all`,{ids:routes});
        
      
 

        setRouteData(responseRoutes.data);

      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching route data:", error);
      } finally{
        setIsLoading(false)
      }
    };
    
    
    if (!routeData || Object.keys(routeData).length === 0) {
      getData();
 
    }
  }, [userInfo.groop,routeData,setRouteData]);



  return routeData;
};

export default useRouteAuth;

