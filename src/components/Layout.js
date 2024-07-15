import { motion } from 'framer-motion';
import NavBar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
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
