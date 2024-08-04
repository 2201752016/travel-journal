import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from '../redux/slices/authSlice';

export default function useAuth(){
    const [loading, setLoading] = useState(false);
    const route = useRouter();
    const dispatch = useDispatch();

    const Auth = async(url, option) => {
        setLoading(true);
        try {
            const resp = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                option, {
                headers: {
                    apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                },
            });
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('email', resp.data.data.email);
            dispatch(setUser(resp.data.data));
            route.push("/dashboarded");
        } catch (error) {
            alert("Gagal melakukan autentikasi. Silakan coba lagi.");
        } finally {
            setLoading(false); 
        }
    };

    return { Auth, loading };
}
