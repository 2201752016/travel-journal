import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith('/dashboarded');

  return (
    <div>
      {!isDashboard && <Navbar />}
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: { opacity: 0 },
          pageAnimate: { opacity: 1 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Layout;
