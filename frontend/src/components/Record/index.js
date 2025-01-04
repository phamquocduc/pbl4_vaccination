import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';

// import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Record.module.scss';

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

//import { RecordContext } from '~/Context/RecordContext';

const cx = classNames.bind(styles);

function Record({ record }) {
    //const { records, addRecord, updateRecord, deleteRecord } = useContext(RecordContext);

    const navigate = useNavigate();
    // Lấy role
    const userRole = localStorage.getItem('userRole');

    return (
        <div className={cx('card-record')}>
            <div className={cx('card-body')}>
                <div className={cx('info-card')}>
                    <ul className={cx('list-items')}>
                        <li>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faCircleUser} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Họ và tên:</div>
                                </div>

                                <div className={cx('content-card')} style={{ color: '#00B5F1' }}>
                                    {record.fullName}
                                </div>
                            </div>
                        </li>

                        <li style={{ display: 'flex' }}>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faHandshake} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Mối quan hệ:</div>
                                </div>
                                <div className={cx('content-card')}>{record.relationship}</div>
                            </div>
                        </li>

                        <li style={{ display: 'flex' }}>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faCakeCandles} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Ngày Sinh:</div>
                                </div>
                                <div className={cx('content-card')}>
                                    {record.dateOfBirth ? new Date(record.dateOfBirth).toISOString().split('T')[0] : ''}
                                </div>
                            </div>
                        </li>

                        <li style={{ display: 'flex' }}>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faPhone} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Số điện thoại:</div>
                                </div>
                                <div className={cx('content-card')}>{record.phone}</div>
                            </div>
                        </li>

                        <li style={{ display: 'flex' }}>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faVenusMars} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Giới tính:</div>
                                </div>
                                <div className={cx('content-card')}>{record.gender}</div>
                            </div>
                        </li>

                        <li style={{ display: 'flex' }}>
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faMapLocationDot} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Địa chỉ:</div>
                                </div>
                                <div className={cx('content-card')}>{record.address}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={cx('btn-card')}>
                    {userRole == 'admin' ? (
                        <button type="button" className={cx('btn-delete')}>
                            <FontAwesomeIcon icon={faTrashCan} />
                            <span>Xóa hồ sơ</span>
                        </button>
                    ) : (
                        <div></div>
                    )}

                    <button
                        className={cx('btn-edit')}
                        onClick={() => {
                            navigate('/createRecord', {
                                state: { handle: record.id },
                            });
                        }}
                    >
                        {userRole === 'user' ? (
                            <div>
                                <FontAwesomeIcon icon={faPenToSquare} /> <span> Sửa hồ sơ </span>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Record;
