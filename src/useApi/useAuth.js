import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice'; // Import the login action

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const Auth = async (url, option) => {
    setLoading(true);
    console.log('Attempting to authenticate...');
    console.log('URL:', `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`);
    console.log('Options:', option);

    try {
      const resp = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`, option, {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', resp.data);

      if (resp.data && resp.data.data) {
        const userData = resp.data.data;
        const token = resp.data.token; // Assuming the token is returned in this way

        // Dispatch login action to update Redux state
        dispatch(login(userData));

        // Store token and user data in local storage
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
        }

        // Redirect to dashboard
        router.push('/dashboarded');
      } else {
        console.error('Unexpected response structure:', resp);
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Failed to authenticate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { Auth, loading };
}
