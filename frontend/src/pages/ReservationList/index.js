import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Reservation.module.scss';

import Record from '~/components/Record';
import Reservation from '~/components/Reservation';

const cx = classNames.bind(styles);

function ReservationList() {
    const records = [
        {
            fullName: 'Trần Qaun',
            relationship: 'Họ hàng',
            dob: '04/07/2004',
            gender: 'Nữ',
            phone: '0144456789',
            email: '127@gmail.com',
            address: 'Hà Nội',
        },
        {
            fullName: 'Trần Quang Khải',
            relationship: 'Bố',
            dob: '04/04/2004',
            gender: 'Nam',
            phone: '0123456789',
            email: '123@gmail.com',
            address: 'Đà Nẵng',
        },
    ];
    const [activeIndex, setActiveIndex] = useState(0);

    const buttons = ['Đã thanh toán', 'Chờ thanh toán', 'Đã khám', 'Đã hủy'];
    const handleClick = (index) => {
        console.log('Button clicked:', index); // Kiểm tra sự kiện click
        setActiveIndex(index); // Cập nhật trạng thái
    };

    return (
        <div className="reservationList-wrapper">
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
                    {records.map((record, index) => (
                        <Reservation record={record} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ReservationList;
