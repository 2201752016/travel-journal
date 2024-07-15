import axios from 'axios';

export default function useGetData() {
  const Base_Url = 'https://travel-journal-api-bootcamp.do.dibimbing.id';

  const getData = async (endpoint) => {
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.get(`${Base_Url}/api/v1/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      });
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  return { getData };
}
