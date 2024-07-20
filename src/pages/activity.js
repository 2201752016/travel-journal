import { useEffect, useState } from 'react';
import useGetData from '../api/useGetData';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Activity() {
  const [activities, setActivities] = useState([])
  const {getData} = useGetData();
  const route = useRouter();
  useEffect(() => {
    getData(`activities`).then((res) => setActivities(res.data.data));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Activity Page</h1>
      <ul>
        {activities.length > 0 ? (
          activities.map((res) => (
            <div key={res.id}>
                <button onClick={()=>route.push(`/detail/activity/${res.id}`)}>
                    <Image src={res.imageUrls[0] || res.imageUrls[1]} alt={res.title} width={300} height={300} style={{height:"300px"}}/>
                    <div>
                        <h6>{res.title}</h6>
                    </div>
                </button>
            </div>
          ))
        ) : (
          <li>No activities available</li>
        )}
      </ul>
    </motion.div>
  );
}
