//frontend/src/hooks/PatchHook.jsx
import axios from "axios";
export const PatchHook = async (id, formData) => {
    try {
        const response = await axios.patch(`https://full-stack-project-01-aks.vercel.app/cruds/${id}`,formData,{
            headers:{'Content-Type': 'multipart/form-data',}
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
}