import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const ReservationContext = createContext();

function ReservationProvider({ children }) {
    // Lấy role
    const userRole = localStorage.getItem('userRole');

    const [reservations, setReservations] = useState([]);

    const token = localStorage.getItem('authToken');

    // if (!token) {
    //     console.error('Không tìm thấy token. Chuyển hướng người dùng về trang đăng nhập.');
    //     // Gợi ý: chuyển hướng về login
    //     window.location.href = '/';
    //     //return;
    // }

    const userGetReservation = async () => {
        try {
            //const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }
            const response = await axios.get(`http://localhost:3000/user/get-vaccine-reservations`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header để xác thực
                },
            });

            console.log(response.data);
            setReservations(response.data); // Lưu dữ liệu vào state
        } catch (error) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data);
            } else {
                console.error('Lỗi kết nối:', error.message);
                alert('Không thể kết nối đến server.');
            }
        }
    };

    const adminGetReservation = async () => {
        try {
            const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }
            // API endpoint dành cho admin
            const response = await axios.get(`http://localhost:3000/admin/reservations`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header để xác thực
                },
            });

            console.log(response.data);
            setReservations(response.data); // Lưu dữ liệu vào state
        } catch (error) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data);
            } else {
                console.error('Lỗi kết nối:', error.message);
                alert('Không thể kết nối đến server.');
            }
        }
    };

    useEffect(() => {
        if (userRole == 'user') {
            userGetReservation();
        } else if (userRole == 'admin') {
            adminGetReservation();
        }
    }, [userRole]); // Đưa userRole vào dependencies để theo dõi thay đổi

    return <ReservationContext.Provider value={{ reservations }}>{children}</ReservationContext.Provider>;
}
export { ReservationContext, ReservationProvider };
