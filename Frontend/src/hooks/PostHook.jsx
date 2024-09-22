//frontend/src/hooks/PostHook.jsx
import axios from 'axios';
export const PostHook = async (Data) => {
    console.log(Data);
    try {
        const response = await axios.post('https://full-stack-project-01-aks.vercel.app/cruds',Data,{
            headers: {'Content-Type': 'multipart/form-data',}
        })
        return response.data;
    } catch (error) {
        console.error('Error while submitting the form:', error);
    }
}