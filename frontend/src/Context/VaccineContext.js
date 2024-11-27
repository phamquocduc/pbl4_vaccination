import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const VaccineContext = createContext();

function VaccineProvider({ children }) {
    const [vaccines, setVaccines] = useState([]);
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Trạng thái lỗi

    // Lấy danh sách vaccine từ API
    // useEffect(() => {
    //     const fetchVaccines = async () => {
    //         try {
    //             const response = await axios.get('/api/vaccines'); // Đường dẫn API của bạn
    //             setVaccines(response.data);
    //         } catch (err) {
    //             console.error('Error fetching vaccines:', err);
    //             setError('Failed to fetch vaccine data.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchVaccines();
    // }, []);

    return <VaccineContext.Provider value={{ vaccines, loading, error }}>{children}</VaccineContext.Provider>;
}

export { VaccineContext, VaccineProvider };
