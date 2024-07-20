import { useEffect, useState } from 'react';
import useGetData from '../api/useGetData';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Home() {
  const [banner, setBanner] = useState([])
  const {getData} = useGetData();
  const route = useRouter();
  useEffect(() => {
    getData(`banners`).then((res) => setBanner(res.data.data));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Home Page</h1>
      <ul>
      {banner.map((bann)=>(
          <div key={bann.id}>
            <button aria-label={bann.name} onClick={()=>route.push(`/detail/banner/${bann.id}`)}>
                <div className="card" style={{width:"16rem"}}>
                  <img src={bann.imageUrl} alt={bann.name} className="card-img" style={{height:"11rem"}}/>
                  <div className="cardText">
                    <h5 className="card-title">{bann.name}</h5>
                  </div>
                </div>
            </button>
          </div>  
        ))}
      </ul>
    </motion.div>
  );
}
