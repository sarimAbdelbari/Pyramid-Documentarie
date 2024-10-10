import { useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

const useAuth = () => {

  
  const { isAuthenticated ,setIsAuthenticated ,setUserInfo } = useStateContext();

  useEffect(() => {
    const checkAuth = async () => {
      try {
       const result = await axios.get('http://localhost:5000/api/auth/check-auth', {
          withCredentials: true,
        });
         setUserInfo(result.data.user);

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);
  
  return isAuthenticated;
};

export default useAuth;
