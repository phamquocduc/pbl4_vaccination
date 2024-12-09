import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './RecordList.module.scss';

import Record from '~/components/Record';
import { RecordContext } from '~/Context/RecordContext';

const cx = classNames.bind(styles);

function RecordList() {
    // Lấy role
    const userRole = localStorage.getItem('userRole');

    const { records } = useContext(RecordContext);
    console.log(userRole);

    return (
        <div className={cx('recordList-wrapper')}>
            <div className={cx('recordList-body')}>
                <div className={cx('title')}>
                    <h2>Danh sách hồ sơ bệnh nhân</h2>
                </div>

                <ul className={cx('list-card')}>
                    {records.map((record, index) => (
                        <Record record={record} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RecordList;
