"use client"
import useGetData from '../useApi/useGetData';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from '../components/ui/Button';


export default function userList(){
    const {getData} = useGetData();
    const [user, setUser] = useState([]);
    const route = useRouter();

    useEffect(()=>{
        getData(`all-user`).then((res)=>setUser(res.data.data));
    }, [])

    return(
        <div>
            <div className="container mx-5 mt-3">
                <div className="text-center">
                <table className="table table-bordered" style={{width:"80%"}}>
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Edit</th>
        ,.              </tr>
                    </thead>
                    <tbody>
                        {user.length > 0 && (
                            user.map((userData)=>(
                            <tr key={userData.id}>
                                <td><img src={userData.profilePictureUrl} alt={userData.name} style={{height:"50px", width:"50px", borderRadius:"50%"}}/></td>
                                <td>{userData.name}</td>
                                <td>{userData.role}</td>
                                <td>{userData.email}</td>
                                <td>{userData.phoneNumber}</td>
                                <td>
                                    <div className="d-flex">
                                        <Button className="btn btn-success" onClick={()=>route.push(`/form/user/${userData.id}`)}>Update</Button>
                                    </div>
                                </td>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}