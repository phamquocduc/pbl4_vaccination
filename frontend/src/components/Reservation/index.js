import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Reservation.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCakeCandles,
    faCircleUser,
    faHandshake,
    faLocation,
    faMapLocationDot,
    faPhone,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Reservation({ reservation }) {
    const navigate = useNavigate();
    console.log(reservation);

    const handleNavigation = () => {
        navigate('/ReservationDetail', {
            state: { handle: reservation },
        });
        console.log('xin chào');
    };
    return (
        <div className={cx('card-reservation')} onClick={handleNavigation} style={{ cursor: 'pointer' }}>
            <div className={cx('card-reservation-header')}>
                <span>
                    Mã phiếu: <strong>KDT - {reservation.id} </strong>
                </span>
                <button className={cx('cancel-button')}>{reservation.status}</button>
            </div>
            <div className={cx('card-reservation-body')}>
                <h3>{reservation.profile.fullName}</h3>
                <div className={cx('hospital-info')}>
                    <span className={cx('hospital-icon')}>🏥</span>
                    <span>{reservation.vaccinationCenter.name}</span>
                </div>
                <div className={cx('service-info')}>
                    <span className={cx('service-icon')}>➕</span>
                    <span>
                        Dịch vụ:{' '}
                        {reservation.vaccines.map((vaccine, index) => (
                            <span key={index} style={{ color: 'red' }}>
                                {vaccine.name}
                                {index < reservation.vaccines.length - 1 ? ', ' : ''}{' '}
                                {/* Thêm dấu phẩy nếu không phải phần tử cuối */}
                            </span>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Reservation;
