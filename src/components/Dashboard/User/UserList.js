"use client";
import useGetData from "../../../useApi/useGetData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@components/ui/Button";


export default function userList(){
    const {getData} = useGetData();
    const [user, setUser] = useState([]);
    const route = useRouter();

    useEffect(()=>{
        getData(`all-user`).then((res)=>setUser(res.data.data));
    }, [])

    return(
        <div className="container mx-auto my-8">
        <div className="text-center">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Image</th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Role</th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Phone</th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Edit</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {user.length > 0 && (
                        user.map((userData) => (
                            <tr key={userData.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={userData.profilePictureUrl} alt={userData.name} className="w-12 h-12 rounded-full"/>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{userData.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{userData.role}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{userData.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{userData.phoneNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center">
                                        <Button className="px-4 py-2 text-xs font-bold text-white uppercase bg-green-500 rounded hover:bg-green-700" onClick={()=>route.push(`/dashboarded/user/${userData.id}`)}>Update</Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
    )
}