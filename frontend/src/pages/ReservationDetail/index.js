import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';

import classNames from 'classnames/bind';
import styles from './ReservationDetail.module.scss';

import { VaccineContext } from '~/Context/VaccineContext';
import axios from 'axios';

const cx = classNames.bind(styles);

function ReservationDetail() {
    // Lấy thông tin vaccine
    const { getVaccineById } = useContext(VaccineContext);

    // Nhận state nếu là sửa thông tin:
    const location = useLocation();
    const ReservationInfo = location.state?.handle || ''; // Nhận giá trị record_ID (profile_ID)
    console.log('ReservationInfo', ReservationInfo);

    // Lấy role
    const userRole = localStorage.getItem('userRole');

    const reservationCard = {
        hospitalName: ReservationInfo.vaccinationCenter.name,
        hospitalAddress: ReservationInfo.vaccinationCenter.address,
        status: ReservationInfo.status,
        appointmentDate: format(new Date(ReservationInfo.appointmentDate), 'dd-MM-yyyy'),
        ticketId: 'KDT - ' + ReservationInfo.id,
        service: ReservationInfo.vaccines.map((vaccine, index) => vaccine.name).join(', '),
        price: ReservationInfo.price + 'VNĐ',
        patientName: ReservationInfo.profile.fullName,
        birthDate: format(new Date(ReservationInfo.profile.dateOfBirth), 'dd-MM-yyyy'),
        patientId: 'TQK - ' + ReservationInfo.profile.id,
        reservationDate: ReservationInfo.reservationDate,
        vaccines: ReservationInfo.vaccines,
    };

    // Đếm thời gian
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        // Tính thời gian đếm ngược (5 phút từ reservationDate)
        const reservationTime = new Date(reservationCard.reservationDate).getTime();
        const countdownEndTime = reservationTime + 5 * 60 * 1000;

        let intervalId; // Khai báo trước

        const updateCountdown = () => {
            const currentTime = new Date().getTime();
            const remainingTime = countdownEndTime - currentTime;

            if (remainingTime <= 0) {
                setTimeLeft(0);

                console.log('Hết thời gian');
                clearInterval(intervalId); // Truy cập biến sau khi đã được khởi tạo
            } else {
                setTimeLeft(remainingTime);
            }
        };

        updateCountdown(); // Cập nhật ngay khi component render
        intervalId = setInterval(updateCountdown, 1000); // Gán giá trị sau khi khai báo

        return () => clearInterval(intervalId); // Dọn dẹp khi component unmount
    }, [reservationCard.reservationDate]);

    // Định dạng thời gian đếm ngược
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }
            // Dữ liệu gửi đến API
            const paymentData = {
                orderInfo: ReservationInfo.orderId,
                amount: ReservationInfo.price,
                returnUrl: 'http://localhost:3001/returnPage', // URL trả về sau thanh toán
            };

            // Gửi yêu cầu POST đến API
            const response = await axios.post('http://localhost:3000/vnpay/create-payment', paymentData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            });

            if (response.status === 201) {
                // Chuyển hướng đến trang thanh toán của VNPay
                window.location.href = response.data.paymentUrl; // paymentUrl được trả về từ API
            } else {
                alert('Có lỗi xảy ra khi tạo thanh toán.');
            }
        } catch (error) {
            console.error('Lỗi khi xử lý thanh toán:', error);
            alert('Không thể thực hiện thanh toán. Vui lòng thử lại.');
        }
    };

    // Xử lý logic phiếu khám (Đã xác nhận)
    const [vaccineDetails, setVaccineDetails] = useState({}); // Lưu thông tin vaccine theo ID

    // Hàm để lấy thông tin vaccine theo ID và lưu vào state
    const fetchVaccineDetails = async (id) => {
        if (vaccineDetails[id]) return; // Nếu đã có dữ liệu, không gọi API nữa
        const vaccineInfo = await getVaccineById(id); // Gọi hàm getVaccineById
        setVaccineDetails((prevDetails) => ({
            ...prevDetails,
            [id]: vaccineInfo, // Lưu kết quả theo ID vaccine
        }));
    };

    const data = ReservationInfo;
    //  1: Lọc các phần tử `isCompleted: false`
    const filteredAppointments = data.appointments.filter((appointment) => !appointment.isCompleted);
    // Lấy danh sách appointment đã hoàn thành trong reservation
    const isCompletedAppointments = data.appointments.filter((appointment) => appointment.isCompleted);
    //  2: Loại bỏ các phần tử trùng `vaccine.name`
    const uniqueAppointments = [];
    const seenVaccineNames = new Set();

    filteredAppointments.forEach((appointment) => {
        const vaccineName = appointment.vaccine.name;
        if (!seenVaccineNames.has(vaccineName)) {
            uniqueAppointments.push(appointment);
            seenVaccineNames.add(vaccineName);
        }
    });
    // 3: Thêm danh sách đã hoàn thành vào cuối
    const finalAppointments = [...uniqueAppointments, ...isCompletedAppointments];
    //Test In ra kết quả
    // finalAppointments.forEach((appointment) => {
    //     console.log(`id: ${data.id}`);
    //     console.log(`reservationDate: ${data.reservationDate}`);
    //     console.log(`appointmentDate: ${appointment.appointmentDate}`);
    //     console.log(`vaccineName: ${appointment.vaccine.name}`);
    //     console.log(`isCompleted: ${appointment.isCompleted}`);
    //     console.log(''); // Dòng trống để ngăn cách
    // });

    useEffect(() => {
        // Gọi fetchVaccineDetails cho từng vaccine ID trong finalAppointments
        finalAppointments.forEach((appointment) => {
            fetchVaccineDetails(appointment.vaccine.id);
        });
    }, [finalAppointments]);

    return (
        <div>
            {ReservationInfo.status == 'Chờ thanh toán' || ReservationInfo.status == 'Đã hủy' ? (
                <div className={cx('wrapper-ReservationDetail')}>
                    <div className={cx('container-ReservationDetail')}>
                        <div className={cx('card')}>
                            <div className={cx('card-header')}>
                                <h2>PHIẾU KHÁM BỆNH</h2>
                                <p className={cx('hospital-name')}>{reservationCard.hospitalName}</p>
                                <p className={cx('hospital-address')}>{reservationCard.hospitalAddress}</p>
                                <button className={cx('status-button')}>{reservationCard.status}</button>
                                {ReservationInfo.status == 'Chờ thanh toán' ? (
                                    <div>
                                        <span>Thời gian thanh toán còn lại: </span>
                                        <span style={{ color: 'red' }}>
                                            {timeLeft > 0 ? formatTime(timeLeft) : 'Hết thời gian'}
                                        </span>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <hr />
                            <div className={cx('card-body')}>
                                <div className={cx('info-group')}>
                                    <span>Ngày tiêm mũi đầu:</span>
                                    <span>{reservationCard.appointmentDate}</span>
                                </div>

                                <div className={cx('info-group')}>
                                    <span>Mã phiếu:</span>
                                    <span>{reservationCard.ticketId}</span>
                                </div>
                                <div className={cx('info-group')}>
                                    <span>Dịch vụ:</span>
                                    <span>{reservationCard.service}</span>
                                </div>

                                <div className={cx('info-group')}>
                                    <span>Phí khám:</span>
                                    <span>{reservationCard.price}</span>
                                </div>

                                <div className={cx('info-group')}>
                                    <span>Bệnh nhân:</span>
                                    <span>{reservationCard.patientName}</span>
                                </div>

                                <div className={cx('info-group')}>
                                    <span>Ngày sinh:</span>
                                    <span>{reservationCard.birthDate}</span>
                                </div>

                                <div className={cx('info-group')}>
                                    <span>Mã bệnh nhân:</span>
                                    <span>{reservationCard.patientId}</span>
                                </div>
                            </div>
                            {ReservationInfo.status == 'Chờ thanh toán' ? (
                                <div className={cx('wrapperButton')}>
                                    <button className={cx('rePayButton')} onClick={handlePayment}>
                                        Thanh toán lại
                                    </button>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('container-ReservationDetail', 'Paid')}>
                    {finalAppointments.map((appointment, index) => {
                        const vaccineInfo = vaccineDetails[appointment.vaccine.id]; // Lấy thông tin từ state
                        if (!vaccineInfo) {
                            return (
                                <div key={index} className={cx('card')}>
                                    <div>Đang tải thông tin vaccine...</div>
                                </div>
                            );
                        }

                        // Tính tổng số mũi
                        const totalDoses = vaccineInfo.doseNumber;

                        // Tính mũi hiện tại
                        const currentDose =
                            finalAppointments
                                .filter((a) => a.vaccine.id === appointment.vaccine.id)
                                .findIndex((a) => a.id === appointment.id) + 1;

                        return (
                            <div key={appointment.vaccine.id + index} className={cx('card')}>
                                <div className={cx('card-header')}>
                                    <h2>PHIẾU KHÁM BỆNH</h2>
                                    <p className={cx('hospital-name')}>{data.vaccinationCenter.name}</p>
                                    <p className={cx('hospital-address')}>{data.vaccinationCenter.address}</p>
                                    <button className={cx('status-button')}>{data.status}</button>
                                </div>
                                <hr />
                                <div className={cx('card-body')}>
                                    <div className={cx('info-group')}>
                                        <span>Mã phiếu:</span>
                                        <span>{data.id}</span>
                                    </div>

                                    <div className={cx('info-group')}>
                                        <span>Dịch vụ:</span>
                                        <span style={{ fontWeight: '550px', fontSize: '1.6rem' }}>
                                            <span>{vaccineInfo.name}</span>
                                        </span>
                                    </div>

                                    <div className={cx('info-group')}>
                                        <span>Tổng số mũi:</span>
                                        <span>{totalDoses}</span>
                                    </div>

                                    <div className={cx('info-group')}>
                                        <span>Mũi thứ:</span>
                                        <span>{currentDose}</span>
                                    </div>

                                    <div className={cx('info-group')}>
                                        <span>Ngày tiêm:</span>
                                        <span>{format(new Date(appointment.appointmentDate), 'dd-MM-yyyy')}</span>
                                    </div>

                                    <div className={cx('info-group')}>
                                        <span>Ngày tiêm tiếp theo (Dự kiến):</span>
                                        <span>
                                            {format(new Date(appointment.nextAppointmentDate), 'dd-MM-yyyy') ||
                                                'Chưa xác định'}
                                        </span>
                                    </div>

                                    <div className={cx('info-group')}>
                                        <span>Mã bệnh nhân:</span>
                                        <span>{data.profile.id}</span>
                                    </div>

                                    <div className={cx('info-group')}>
                                        <span>Bệnh nhân:</span>
                                        <span>{data.profile.fullName}</span>
                                    </div>

                                    <div className={cx('info-group')}>
                                        <span>Ngày sinh:</span>
                                        <span>{format(new Date(data.profile.dateOfBirth), 'dd-MM-yyyy')}</span>
                                    </div>

                                    <div className={cx('info-group')}>
                                        <span>Số điện thoại:</span>
                                        <span>{data.profile.phone}</span>
                                    </div>

                                    <div className={cx('info-group')}>
                                        <span>Tiến trình:</span>
                                        <span
                                            style={{
                                                fontWeight: '550',
                                                color: appointment.isCompleted ? 'green' : 'red',
                                            }}
                                        >
                                            {appointment.isCompleted ? 'Đã tiêm' : 'Chưa tiêm'}
                                        </span>
                                    </div>
                                    {
                                        /*userRole === 'admin' &&*/ appointment.isCompleted == false ? (
                                            <div className={cx('button-group')}>
                                                <button className={cx('btnCompleted')}>Hoàn thành</button>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ReservationDetail;
