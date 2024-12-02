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

function Reservation() {
    return (
        <div className={cx('card-reservation')}>
            <div className={cx('card-body')}>
                <div className={cx('info-card')}>
                    <ul className={cx('list-items')}>
                        <li style={{ display: 'flex' }}>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faCircleUser} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Họ và tên:</div>
                                </div>
                                <div className={cx('content-card')} style={{ color: '#00B5F1' }}>
                                    a
                                </div>
                            </div>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faHandshake} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Giới tính:</div>
                                </div>
                                <div className={cx('content-card')}>a</div>
                            </div>
                        </li>

                        <li style={{ display: 'flex' }}>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faCakeCandles} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Ngày Sinh:</div>
                                </div>
                                <div className={cx('content-card')}>a </div>
                            </div>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faPhone} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Số điện thoại:</div>
                                </div>
                                <div className={cx('content-card')}>a</div>
                            </div>
                        </li>

                        <li>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faMapLocationDot} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Địa chỉ:</div>
                                </div>
                                <div className={cx('content-card')}>a</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={cx('info-card-bottom', 'bottom')}>
                    <ul className={cx('list-items')}>
                        <li style={{ display: 'flex' }}>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faCircleUser} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Họ và tên:</div>
                                </div>
                                <div className={cx('content-card')} style={{ color: '#00B5F1' }}>
                                    a
                                </div>
                            </div>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faHandshake} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Giới tính:</div>
                                </div>
                                <div className={cx('content-card')}>a</div>
                            </div>
                        </li>

                        <li style={{ display: 'flex' }}>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faCakeCandles} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Ngày Sinh:</div>
                                </div>
                                <div className={cx('content-card')}>a </div>
                            </div>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faPhone} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Số điện thoại:</div>
                                </div>
                                <div className={cx('content-card')}>a</div>
                            </div>
                        </li>

                        <li>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faMapLocationDot} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Địa chỉ:</div>
                                </div>
                                <div className={cx('content-card')}>a</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Reservation;
