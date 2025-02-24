import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingDatePage.css';
import { Fragment } from 'react';
import Calendar from 'react-calendar';

function BookingDatePage() {
    // Đoạn lấy thông tin bệnh viện
    const [hospitalData, setHospitalData] = useState({ hospitalName: '', phoneNumber: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                const response = await axios.get('https://api.example.com/hospital-info');
                setHospitalData(response.data); // Cập nhật dữ liệu từ API
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu bệnh viện: ', error);
            } finally {
                setLoading(false); // Đảm bảo loading được tắt sau khi API hoàn thành
            }
        };

        fetchHospitalData();
    }, []);

    // đoạn ni là là set đổi với lấy thời gian chọn thâu
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [showCalendar, setShowCalendar] = useState(true);

    const timeSlotOptions = {
        morning: ['07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00'],
        afternoon: ['13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00'],
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
        setTimeSlots(timeSlotOptions); // Hiển thị các khung giờ cho ngày đã chọn
    };

    const handleTimeSlotSelect = (slot) => {
        //console.log('Khung giờ được chọn:', slot);
        // Xử lý khi người dùng chọn khung giờ, như lưu vào state hoặc gọi API
        console.log(slot, selectedDate.toLocaleDateString());
    };

    return (
        <div className="wrapper">
            <div className="central-information">
                <div className="hospital-info-container">
                    <h3 className="hospital-info-title">Thông tin cơ sở y tế</h3>
                    <div className="hospital-info-details">
                        <div className="hospital-info-item">
                            <span className="hospital-icon">🏥</span>
                            <span className="hospital-text">{hospitalData.hospitalName}</span>
                        </div>
                        <div className="hospital-info-item">
                            <span className="phone-icon">📞</span>
                            <span className="hospital-text">{hospitalData.phoneNumber}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="date-time-picker">
                <h3 id="title">Vui lòng chọn ngày khám</h3>
                {showCalendar ? (
                    <Calendar
                        onChange={handleDateChange}
                        minDate={new Date()} // Chỉ cho phép chọn ngày từ hôm nay trở đi
                        maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))} // Giới hạn đến tháng sau
                    />
                ) : (
                    <div>
                        <h3>Ngày đã chọn: {selectedDate.toLocaleDateString()}</h3>
                        <div className="time-slots">
                            <h4 style={{ color: 'red' }}>Buổi sáng</h4>
                            <div className="slot-container">
                                {timeSlotOptions.morning.map((slot, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTimeSlotSelect(slot)}
                                        className="time-slot"
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                            <h4 style={{ color: 'red' }}>Buổi chiều</h4>
                            <div className="slot-container">
                                {timeSlotOptions.afternoon.map((slot, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTimeSlotSelect(slot)}
                                        className="time-slot"
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setShowCalendar(true)} id="choose-again-button">
                                Chọn lại ngày
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookingDatePage;
