import { useEffect, useState } from 'react';
import useGetData from '../api/useGetData';
import { motion } from 'framer-motion';

export default function Home() {
  const { getData } = useGetData();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData('banners');
      if (result && Array.isArray(result)) {
        setData(result);
      } else {
        setData([]);
        setError('Failed to fetch banners');
      }
    };
    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, [getData]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Home Page</h1>
      {error && <p>{error}</p>}
      <ul>
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </motion.div>
  );
}
