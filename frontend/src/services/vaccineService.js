// services/vaccineService.js
import axios from 'axios';

const API_BASE_URL = '/api/vaccines'; // Base URL cho API vaccine

// Hàm lấy danh sách vaccine
export const fetchVaccines = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching vaccines:', error);
        throw error; // Ném lỗi để xử lý ở nơi sử dụng
    }
};
