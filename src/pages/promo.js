import { useEffect, useState } from 'react';
import useGetData from '../useApi/useGetData';
import { motion } from 'framer-motion';

export default function Promo() {
  const { getData } = useGetData();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData('promos');
      if (result && Array.isArray(result)) {
        setData(result);
      } else {
        setData([]);
        setError('Failed to fetch promotions');
      }
    };
    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, [getData]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Promo Page</h1>
      {error && <p>{error}</p>}
      <ul>
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        ) : (
          <li>No promotions available</li>
        )}
      </ul>
    </motion.div>
  );
}
