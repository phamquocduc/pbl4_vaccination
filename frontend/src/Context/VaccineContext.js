import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const VaccineContext = createContext();

function VaccineProvider({ children }) {
    const [vaccines, setVaccines] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVaccines = async () => {
            try {
                const response = await axios.get('http://localhost:3000/vaccine');
                setVaccines(response.data);
            } catch (err) {
                console.error('Error fetching vaccines:', err);
                setError('Failed to fetch vaccine data.');
            } finally {
                setLoading(false);
            }
        };

        fetchVaccines();
    }, []);

    // Hàm tạo vaccine
    const createVaccine = async (vaccineData) => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }

            const response = await axios.post(
                'http://localhost:3000/vaccine',
                vaccineData, // Dữ liệu vắc-xin được gửi lên server
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Thêm token vào header
                        'Content-Type': 'application/json', // Đặt Content-Type
                    },
                },
            );

            alert('Thêm vắc-xin thành công!');
            console.log('Vaccine created successfully:', response.data);
        } catch (err) {
            console.error('Lỗi khi thêm vắc-xin:', err.response?.data || err.message);
            alert('Thêm vắc-xin thất bại. Vui lòng kiểm tra lại!');
        }
    };

    //Hàm Update Vaccine
    const updateVaccine = async (id, vaccineData) => {
        try {
            const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }

            const response = await axios.put(`http://localhost:3000/vaccine/update/${id}`, vaccineData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header để xác thực
                },
            });

            console.log('Cập nhật thành công:', response.data);
            alert('Cập nhật vắc xin thành công!');
            return response.data; // Trả về dữ liệu nếu cần sử dụng
        } catch (error) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data);
                alert(`Lỗi cập nhật vắc xin: ${error.response.data.message}`);
            } else {
                console.error('Lỗi kết nối:', error.message);
                alert('Không thể kết nối đến server.');
            }
        }
    };

    // Lấy vaccine theo ID
    const getVaccineById = async (id) => {
        try {
            const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }
            const response = await axios.get(`http://localhost:3000/vaccine/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header để xác thực
                },
            });

            console.log(response.data);
            return response.data; // Trả về dữ liệu nếu cần sử dụng
        } catch (error) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data);
                alert(`Lỗi lấy thông tin vắc xin: ${error.response.data.message}`);
            } else {
                console.error('Lỗi kết nối:', error.message);
                alert('Không thể kết nối đến server.');
            }
        }
    };

    if (loading) return <p>Loading vaccines...</p>;
    if (error) return <p>{error}</p>;

    return (
        <VaccineContext.Provider value={{ vaccines, createVaccine, updateVaccine, getVaccineById }}>
            {children}
        </VaccineContext.Provider>
    );
}

export { VaccineContext, VaccineProvider };
