import React, { useState, useContext } from 'react';
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
    return (
        <div className={cx('card-reservation')}>
            <div className={cx('card-reservation-header')}>
                <span>
                    Mã phiếu: <strong>T2412060BZ0AY</strong>
                </span>
                <button className={cx('cancel-button')}>Đã hủy</button>
            </div>
            <div className={cx('card-reservation-body')}>
                <h3>ÔNG BẢO</h3>
                <div className={cx('hospital-info')}>
                    <span className={cx('hospital-icon')}>🏥</span>
                    <span>BỆNH VIỆN VŨNG TÀU</span>
                </div>
                <div className={cx('service-info')}>
                    <span className={cx('service-icon')}>➕</span>
                    <span>Dịch vụ: Tiêm chủng Não mô cầu BC</span>
                </div>
            </div>
        </div>
    );
}

export default Reservation;
