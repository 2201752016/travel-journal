import { useEffect, useState } from 'react';
import useGetData from '../api/useGetData';
import { motion } from 'framer-motion';

export default function Activity() {
  const { getData } = useGetData();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData('activities');
      if (result && Array.isArray(result)) {
        setData(result);
      } else {
        setData([]);
        setError('Failed to fetch activities');
      }
    };
    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, [getData]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Activity Page</h1>
      {error && <p>{error}</p>}
      <ul>
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        ) : (
          <li>No activities available</li>
        )}
      </ul>
    </motion.div>
  );
}
