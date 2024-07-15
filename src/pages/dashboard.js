import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          {/* Add more user-specific content here */}
        </div>
      ) : (
        <p>You need to log in to view this page.</p>
      )}
    </motion.div>
  );
};

export default Dashboard;
