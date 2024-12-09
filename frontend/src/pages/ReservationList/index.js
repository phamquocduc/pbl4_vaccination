import React, { useState, useContext, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Reservation.module.scss';

import Record from '~/components/Record';
import Reservation from '~/components/Reservation';

import { ReservationContext } from '~/Context/ReservationContext';

const cx = classNames.bind(styles);

function ReservationList() {
    // Lấy role
    const userRole = localStorage.getItem('userRole');

    const { reservations } = useContext(ReservationContext);

    // Nhóm reservation theo tính chất
    const paidReservations = reservations.filter((r) => r.status === 'Đã xác nhận');
    const unpaidReservations = reservations.filter((r) => r.status === 'Chờ thanh toán');
    const completedAppointments = reservations.filter((r) => r.status === 'Đã khám');
    const cancelledReservations = reservations.filter((r) => r.status === 'Đã hủy');

    const [reservationsView, setReservationsView] = useState([]);

    const [activeIndex, setActiveIndex] = useState(0);

    // useEffect(() => {
    //     if (activeIndex == 0) {
    //         setReservationsView(paidReservations);
    //     } else {
    //     }
    // }, []);

    const buttons = ['Đã thanh toán', 'Chờ thanh toán', 'Đã khám', 'Đã hủy'];
    const handleClick = (index) => {
        const key = index;
        console.log('Button clicked:', index); // Kiểm tra sự kiện click
        setActiveIndex(index); // Cập nhật trạng thái
        if (key === 0) {
            setReservationsView(paidReservations);
        }
        if (key === 1) {
            setReservationsView(unpaidReservations);
        }
        if (key === 2) {
            setReservationsView(completedAppointments);
        }
        if (key === 3) {
            setReservationsView(cancelledReservations);
        }
    };

    return (
        <div className={cx('reservationList-wrapper')}>
            <div className={cx('reservationList-body')}>
                <div className={cx('title')}>
                    <h2>Danh sách phiếu khám bệnh</h2>
                </div>

                <div className={cx('wrapper-botton')}>
                    <ul>
                        {buttons.map((text, index) => (
                            <li key={index}>
                                <button
                                    className={cx('selectionButton', {
                                        active: activeIndex == index,
                                    })}
                                    onClick={() => handleClick(index)}
                                >
                                    <h2>{text}</h2>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <ul className={cx('reservationList-card')}>
                    {reservationsView.map((reservation, index) => (
                        <Reservation reservation={reservation} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ReservationList;
