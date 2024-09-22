// frontend/src/hooks/DeleteHook

import axios from 'axios';
export const DeleteHook = async (id) => {
    try {
        await axios.delete(`https://full-stack-project-01-aks.vercel.app/cruds/${id}`)
    } catch (error) {
        console.error("Error deleting product", error);
    }
}