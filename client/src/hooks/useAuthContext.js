import { useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

const useAuth = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(null); // Use null as the initial state to differentiate between loading and loaded states
  const {isAuthenticated ,setIsAuthenticated } = useStateContext();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:5000/api/auth/check-auth', {
          withCredentials: true,
        });

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);
  // Return null while checking authentication
  return isAuthenticated;
};

export default useAuth;
