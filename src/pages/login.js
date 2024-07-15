import { useState } from 'react';
import useAuth from '../api/useAuth';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '../styles/Form.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { Auth, loading } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Auth('login', { email, password });
      if (response) {
        dispatch(login(response.data));
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <motion.div className={styles.formContainer} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <Link href="/register" passHref>
          <span className={styles.switchLink}>Don't have an account? Register</span>
        </Link>
      </form>
    </motion.div>
  );
};

export default Login;
