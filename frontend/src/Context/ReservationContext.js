import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const ReservationContext = createContext();

function ReservationProvider({ children }) {
    const [reservation, setReservation] = useState();

    fetchReservation = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }
            const response = await axios.get('http://localhost:3000/user/get-vaccine-reservations', {
                headers: {
                    headers: {
                        Authorization: `Bearer ${token}`, // Thêm token vào header
                    },
                },
            });
            /// Lấy dữ liệu từ response
            const data = response.data;
            console.log('Danh sách đặt chỗ vaccine:', data);

            // Duyệt qua các bản ghi và hiển thị thông tin cụ thể
            data.forEach((reservation) => {
                console.log(`ID: ${reservation.id}`);
                console.log(`Ngày đặt chỗ: ${reservation.reservationDate}`);
                console.log(`Ngày hẹn: ${reservation.appointmentDate}`);
                console.log(`Trung tâm: ${reservation.vaccinationCenter.name}`);
                console.log(`Tên vaccine: ${reservation.vaccines.map((vaccine) => vaccine.name).join(', ')}`);
                console.log(`Họ và tên: ${reservation.profile.fullName}`);
                console.log('-------------------------');
            });
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    useEffect(() => {
        fetchReservation();
    }, []);

    return <ReservationContext.Provider>{children}</ReservationContext.Provider>;
}
export { ReservationContext, ReservationProvider };
