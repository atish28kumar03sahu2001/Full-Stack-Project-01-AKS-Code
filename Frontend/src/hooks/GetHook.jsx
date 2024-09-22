// frontend/src/hooks/GetHook.jsx
import axios from "axios";
import { useEffect, useState } from "react";

export const GetHook = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://full-stack-project-01-aks.vercel.app/cruds");
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return { data, loading, error, refetch: fetchData };
};
