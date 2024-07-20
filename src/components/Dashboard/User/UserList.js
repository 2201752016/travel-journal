import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../styles/UserList.module.css';
import { useRouter } from 'next/router';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/users', {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      })
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>User List</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><img src={user.profilePictureUrl} alt={user.name} /></td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => router.push(`/dashboard/user/${user.id}`)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
