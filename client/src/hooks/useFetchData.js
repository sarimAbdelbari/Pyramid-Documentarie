import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';

const useFetchData =  (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const {isLoading , setIsLoading} = useStateContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url);
        setData(response.data);  // Axios automatically parses JSON response
      } catch (err) {
        setIsLoading(false)
        setError(err);
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetchData;
