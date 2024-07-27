import { useState } from "react";
import { useRouter } from "next/router";
import useCreate from "../../../useApi/useCreate";
import Button from "@components/ui/Button";

export default function UpdateUser(){
    const {postCreate} = useCreate();
    const [promp, setPromp] = useState([]);
    const route = useRouter();

    const handleUpload = async (e) => {
        e.preventDefault();
        const bannerData ={
            role:e.target.role.value,   
        }
        try {
            const res = await postCreate(`update-user-role/${route.query.id}`, bannerData);
            if (res?.status === 200) {
                setPromp(res?.data?.message);
            }
        } catch (err) {
            setPromp(err?.response?.data?.message);
        }
    };  

    return(
        <div class="flex justify-center items-center min-h-screen">
            <div class="m-5">
                <form onSubmit={handleUpload}>
                <p>{promp}</p>
                <div class="mb-3 w-full">
                    <label>role</label>
                    <select name="role" class="w-full">
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">
                    Submit
                </button>
                </form>
            </div>
        </div>
    )
}