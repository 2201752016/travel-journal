"use client";
import useGetData from "../../../useApi/useGetData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@components/ui/Button";
import styles from "../../../styles/UserList.module.css"; // Import the new CSS module

export default function UserList() {
  const { getData } = useGetData();
  const [user, setUser] = useState([]);
  const route = useRouter();

  useEffect(() => {
    getData(`all-user`).then((res) => setUser(res.data.data));
  }, []);

  return (
    <div className={`${styles.container} mx-auto my-8`}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {user.length > 0 &&
              user.map((userData) => (
                <tr key={userData.id}>
                  <td className={styles.imageContainer}>
                    <img
                      src={userData.profilePictureUrl}
                      alt={userData.name}
                      className={styles.profileImage}
                    />
                  </td>
                  <td>{userData.name}</td>
                  <td>{userData.role}</td>
                  <td>{userData.email}</td>
                  <td>{userData.phoneNumber}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <Button
                        className={styles.updateButton}
                        onClick={() =>
                          route.push(`/dashboarded/user/${userData.id}`)
                        }
                      >
                        Update
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
