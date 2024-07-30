import { useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

const useRouteAuth = () => {
  const { routeData, setRouteData } = useStateContext();

  useEffect(() => {
    const getRoute = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/route');
        setRouteData(response.data);
      } catch (err) {
        console.error("Error fetching route data:", err);
      }
    };

    if (!routeData || Object.keys(routeData).length === 0) {
      getRoute();
    }
  }, [setRouteData, routeData]);

  return routeData;
};

export default useRouteAuth;
