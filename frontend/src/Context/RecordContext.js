import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const RecordContext = createContext();

function RecordProvider({ children }) {
    // Lấy role
    const userRole = localStorage.getItem('userRole');

    // Tạo mảng để lưu giá trị của mỗi record
    const [records, setRecords] = useState([]);

    const fetchRecords = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }
            // Dùng API để lấy dữ liệu
            const url =
                userRole === 'user'
                    ? 'http://localhost:3000/user/vaccination-profiles'
                    : 'http://localhost:3000/admin/profiles';

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            });
            const data = await response.data;
            setRecords(data);
            console.log(records);
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

    // //Xóa
    // const deleteRecord = async (email) => {
    //     try {
    //         await axios.delete(`URL_API_XOA/${email}`);
    //         setRecords((prevRecords) => prevRecords.filter((item) => item.email !== email));
    //     } catch (error) {
    //         console.error('Lỗi khi xóa record:', error);
    //     }
    //     // setRecords((prevRecords) => prevRecords.filter((item) => item.email !== email));
    // };

    // Lấy 1 record theo ID
    const getRecordById = (id) => {
        if (!id) {
            console.error('ID không được cung cấp.');
            return null;
        }
        const record = records.find((record) => record.id == id); // Giả sử mỗi record có thuộc tính `id`
        if (!record) {
            console.warn('Không tìm thấy record với ID:', id);
        }
        return record;
    };

    // Hàm lấy record theo email
    const getRecordByEmail = (email) => {
        if (!email) {
            console.error('Email không được cung cấp.');
            return null;
        }
        const record = records.find((record) => record.email === email); // Giả sử mỗi record có thuộc tính `email`
        if (!record) {
            console.warn('Không tìm thấy record với Email:', email);
        }
        return record;
    };

    return (
        <RecordContext.Provider
            value={{
                records,
                addRecord,
                updateRecord,
                getRecordById,
                getRecordByEmail,
                //deleteRecord,
            }}
        >
            {children}
        </RecordContext.Provider>
    );
}

export { RecordContext, RecordProvider };
