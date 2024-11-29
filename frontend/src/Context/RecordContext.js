import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const RecordContext = createContext();

function RecordProvider({ children }) {
    // Tạo mảng để lưu giá trị của mỗi record
    const [records, setRecords] = useState([
        {
            fullName: 'Trần Qaun',
            relationship: 'Bản thân',
            dob: '04/07/2004',
            gender: 'Nữ',
            phone: '0144456789',
            email: '127@gmail.com',
            address: 'Hà Nội',
        },
        {
            fullName: 'Trần Quang Khải',
            relationship: 'Bản thân',
            dob: '04/04/2004',
            gender: 'Nam',
            phone: '0123456789',
            email: '123@gmail.com',
            address: 'Đà Nẵng',
        },
        {
            fullName: 'Hồ Quang Hiếu',
            relationship: 'Bạn thân',
            dob: '04/04/2004',
            gender: 'Nam',
            phone: '0123456789',
            email: '123@gmail.com',
            address: 'Đà Nẵng',
        },
    ]);

    const fetchRecords = async () => {
        try {
            // Giả sử bạn dùng API để lấy dữ liệu
            const response = await axios.get('...');
            const data = await response.data;
            setRecords(data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

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

    // useEffect(() => {
    //     fetchRecords();
    // }, []);

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
