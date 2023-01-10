import { useEffect, useState } from 'react';

export const useFetch = ({ url,  method = 'get' }) => {
    const [response, setResponse] = useState({
      data: null,
      loading: true,
      error: null,
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await fetch(url, { method });
          const json = await resp.json();
          setResponse({
            data: json,
            loading: false,
            error: null,
          });
        } catch (error) {
          setResponse({
            data: null,
            loading: false,
            error,
          });
        }
      };
      fetchData();
    }, [url, method]);
  
    return response;
};