import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../styles/EditUser.module.css';

const EditUser = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user/${id}`, {
            headers: {
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            },
          });
          setUser(response.data.data);
          setRole(response.data.data.role);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleRoleChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
        { role },
        {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        }
      );
      router.push('/dashboard/user');
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.editUserContainer}>
      <h1 className={styles.title}>Update Role</h1>
      <form onSubmit={handleRoleChange} className={styles.form}>
        <div className={styles.userInfo}>
          <img src={user.profilePictureUrl} alt={user.name} className={styles.profilePicture} />
          <h2>{user.name}</h2>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.confirmButton}>Confirm</button>
          <button type="button" className={styles.cancelButton} onClick={() => router.back()}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
