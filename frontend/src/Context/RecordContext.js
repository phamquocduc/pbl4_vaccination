import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const RecordContext = createContext();

function RecordProvider({ children }) {
    // Tạo mảng để lưu giá trị của mỗi record
    const [records, setRecords] = useState([]);

    const fetchRecords = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }
            // Giả sử bạn dùng API để lấy dữ liệu
            const response = await axios.get('http://localhost:3000/user/vaccination-profiles', {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            });
            const data = await response.data;
            setRecords(data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };
    useEffect(() => {
        fetchRecords();
    }, []);

    // Thêm record
    const addRecord = async (newRecord) => {
        try {
            const response = await axios.post('URL_API_THEM', newRecord);
            setRecords((prevRecords) => [...prevRecords, response.data]);
        } catch (error) {
            console.error('Lỗi khi thêm record:', error);
        }
    };

    // Cập nhật
    const updateRecord = async (id, updatedData) => {
        try {
            await axios.put(`URL_API_CAP_NHAT/${id}`, updatedData);
            setRecords((prevRecords) => prevRecords.map((item) => (item.id === id ? updatedData : item)));
        } catch (error) {
            console.error('Lỗi khi cập nhật record:', error);
        }
    };

    //Xóa
    const deleteRecord = async (email) => {
        try {
            await axios.delete(`URL_API_XOA/${email}`);
            setRecords((prevRecords) => prevRecords.filter((item) => item.email !== email));
        } catch (error) {
            console.error('Lỗi khi xóa record:', error);
        }
        // setRecords((prevRecords) => prevRecords.filter((item) => item.email !== email));
    };

    return (
        <RecordContext.Provider
            value={{
                records,
                // addRecord,
                // updateRecord,
                deleteRecord,
            }}
        >
            {children}
        </RecordContext.Provider>
    );
}

export { RecordContext, RecordProvider };
