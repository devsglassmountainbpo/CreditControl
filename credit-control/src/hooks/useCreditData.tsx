import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { CreditRecord } from '../types';


const useCreditData = () => {
  const [data, setData] = useState<CreditRecord[]>([]);
  const [filteredData, setFilteredData] = useState<CreditRecord[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get<CreditRecord[]>('https://bn.glassmountainbpo.com:8080/test/credit/list_payrolls');
      setData(response.data);
      setFilteredData(response.data);
      console.log('data', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filterByBadge = useCallback((badge: string) => {
    setFilteredData(badge === '' ? data : data.filter(item => item.badge === badge));
  }, [data]);

  return { data, filteredData, filterByBadge };
};

export default useCreditData;