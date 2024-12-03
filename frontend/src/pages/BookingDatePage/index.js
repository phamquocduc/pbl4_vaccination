import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingDatePage.css';

import Calendar from 'react-calendar';

import { SelectVaccinesContext } from '~/Context/SelectVaccinesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

function BookingDatePage() {
    const navigate = useNavigate();

    // Đoạn lấy thông tin bệnh viện
    const [hospitalData, setHospitalData] = useState({ hospitalName: '', phoneNumber: '' });
    const [loading, setLoading] = useState(true);

    const { selectVaccines, setSelectedDate, setSelectedTime } = useContext(SelectVaccinesContext);

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
    const [selectedDateS, setSelectedDateS] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [showCalendar, setShowCalendar] = useState(true);

    const timeSlotOptions = {
        morning: ['07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00'],
        afternoon: ['13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00'],
    };

    const handleDateChange = (date) => {
        setSelectedDateS(date);
        setShowCalendar(false);
        console.log(selectVaccines);
        setTimeSlots(timeSlotOptions); // Hiển thị các khung giờ cho ngày đã chọn
    };

    const handleTimeSlotSelect = (slot) => {
        //console.log('Khung giờ được chọn:', slot);
        // Xử lý khi người dùng chọn khung giờ, như lưu vào state hoặc gọi API
        setSelectedTime(slot);
        setSelectedDate(
            selectedDateS
                .toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })
                .split('/')
                .reverse()
                .join('/'),
        );
        console.log(
            slot,
            selectedDateS
                .toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })
                .split('/')
                .reverse()
                .join('/'),
        );
        console.log('danh sach vc', selectVaccines);
        navigate('/recordSelector');
    };

    const minDate = new Date(); // Ngày hôm nay
    const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1)); // Giới hạn đến tháng sau

    return (
        <div className="wrapper">
            <div className="inner-central">
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
                {/*  */}
                <div className="date-time-picker">
                    <h3 id="title">Vui lòng chọn ngày khám</h3>
                    {showCalendar ? (
                        <Calendar
                            onChange={handleDateChange}
                            minDate={minDate} // Chỉ cho phép chọn ngày từ hôm nay trở đi
                            maxDate={maxDate} // Giới hạn đến tháng sau
                            //Những ngày nằm ngoài minDate và maxDate
                            tileDisabled={({ date }) => date < minDate || date > maxDate}
                            tileClassName={({ date }) => {
                                if (date < minDate || date > maxDate) {
                                    return 'outside-range';
                                }
                                return '';
                            }}
                        />
                    ) : (
                        <div className="chooseTime">
                            <h3>Ngày đã chọn: {selectedDateS.toLocaleDateString()}</h3>
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
                    <div className="style-btnWrapper">
                        <button onClick={() => navigate(-1)} className="button return">
                            <span>Quay lại</span>
                            <FontAwesomeIcon icon={faRotateLeft} className="icon-btn" style={{ paddingLeft: '5px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDatePage;
