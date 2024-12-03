import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const roll = 'admin';

    return (
        <div className={cx('sidebar')}>
            <div className={cx('btn-buy')}>
                <button className={cx('sidebar-button')}>
                    <Link to="/vaccinereg">
                        <span className={cx('icon')}>💉 </span> Đăng kí tiêm vắc xin
                    </Link>
                </button>
            </div>

            {roll ? (
                <div className={cx('btn-add')}>
                    <button className={cx('sidebar-button')}>
                        <Link to="/createRecord">
                            <span className={cx('icon')}>➕ </span> Thêm hồ sơ
                        </Link>
                    </button>
                </div>
            ) : (
                <div></div>
            )}

            {roll ? (
                <div className={cx('btn-recordList')}>
                    <button className={cx('sidebar-button')}>
                        <Link to="/recordList">
                            <span className={cx('icon')}>📁</span> Hồ sơ bệnh nhân
                        </Link>
                    </button>
                </div>
            ) : (
                <div></div>
            )}

            {roll ? (
                <div className={cx('btn-appointmentCards')}>
                    <button className={cx('sidebar-button')}>
                        <Link to="/reservationlist">
                            <span className={cx('icon')}>📝</span> Phiếu khám bệnh
                        </Link>
                    </button>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Sidebar;
