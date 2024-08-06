import axios from "axios";

export default function useGetData() {
    const Base_Url = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
    
    const getData = async (url) => {
        try {
            const resp = await axios.get(
                `${Base_Url}/api/v1/${url}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    },
                });
            console.log('API response:', resp); // Log the full response
            return resp;
        } catch (error) {
            console.error('API request error:', error.response || error.message);
            return null;
        }
    };
    return { getData };
}
