import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { CreditRecord } from '../types';


const useCreditData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<CreditRecord[]>([]);
  const [filteredData, setFilteredData] = useState<CreditRecord[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<CreditRecord[]>('http://127.0.0.1:5002/credit/list_payrolls');
      setData(response.data);
      setFilteredData(response.data);
      console.log('data', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filterByBadge = useCallback((badge: string) => {
    setFilteredData(badge === '' ? data : data.filter(item => item.badge === badge));
  }, [data]);

  return { data, filteredData, filterByBadge, isLoading};
};

export default useCreditData;