import axios from "axios";

export default function useDelete() {
    const deleteData = async (endpoint, id) => { // Modify function to accept id
        try {
            const res = await axios.delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                }
            });
            return res;
        } catch (error) {
            console.log("Error in deleteData:", error);
            if (error.response) {
                // Handle server-side errors
                console.error('Response error:', error.response.data);
            } else if (error.request) {
                // Handle request errors
                console.error('Request error:', error.request);
            } else {
                // Handle other errors
                console.error('Error:', error.message);
            }
        }
    }

    return { deleteData }
}
