"use client";
import useGetData from "src/api/useGetData";
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
        <div class="container mx-auto my-8">
        <div class="text-center">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {user.length > 0 && (
                        user.map((userData) => (
                            <tr key={userData.id}>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <img src={userData.profilePictureUrl} alt={userData.name} class="h-12 w-12 rounded-full"/>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{userData.name}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.role}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.email}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userData.phoneNumber}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center justify-center">
                                        <Button class="px-4 py-2 bg-green-500 text-white text-xs font-bold uppercase rounded hover:bg-green-700" onClick={()=>route.push(`/dashboarded/user/${userData.id}`)}>Update</Button>
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