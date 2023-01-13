import axios from "axios";
const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjdhMTk5ZGEzYTlmMGQ4NTZiNzk0OTkxZTQxODJjOSIsInN1YiI6IjYxZjg4M2I2Y2NiMTVmMDBiZTAxNTk1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8w2leam12ZsH3MQFNGfmwIBS-5X2y1jGZ5ApcwI-Yh4';
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // params:{
    //     api_key:'727a199da3a9f0d856b794991e4182c9',
    // },
    headers: {
        
        Authorization: `bearer ${token}`,
    },
});
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;
