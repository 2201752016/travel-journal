import axios from "axios";

export default function Delete(){
    const deleteData = async(url)=>{
        try{
            const res = await axios.delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                    apiKey:"24405e01-fbc1-45a5-9f5a-be13afcd757c",
                }
            });
            return res;
        }catch(error){
            console.log(error);
        }
    }
    return {deleteData}
}