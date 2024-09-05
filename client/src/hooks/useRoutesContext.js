import { useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

const useRouteAuth = () => {
  const { routeData, setRouteData, userInfo} = useStateContext();

  useEffect(() => {

    if (!userInfo) {
      return;
    }

    const getData = async () => {
      try {
        const responseGroop = await axios.post(`${import.meta.env.VITE_API_URL}/groop/all` ,{
          groupsIds: userInfo.groop
        });
        
 
         console.log("responseGroop" , responseGroop.data)

          const AllRoute = responseGroop.data.map((route)=>{
           return route.groopRoutes;
          })
      


          console.log("AllRoute.flat()",AllRoute.flat())
        // const responseRoutes = await axios.get('http://localhost:5000/api/route');
        
        setRouteData(AllRoute.flat());

      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };
    
    
    if (!routeData || Object.keys(routeData).length === 0) {
      getData();
 
    }
  }, [setRouteData, routeData, userInfo]);



  return routeData;
};

export default useRouteAuth;

