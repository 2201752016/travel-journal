import axios from "axios";
import { useRouter } from "next/router";

export default function create(){
    const route = useRouter();

    const postCreate = async(url,option)=>{
        try{
            const post = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                option, {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                    apiKey:"24405e01-fbc1-45a5-9f5a-be13afcd757c",
                }
            });
            return post;
        }catch(error){
            console.log(error);
        }
    }
    return {postCreate}
}