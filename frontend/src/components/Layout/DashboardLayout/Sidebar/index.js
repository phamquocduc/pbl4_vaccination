import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import { RecordContext } from '~/Context/RecordContext';

const cx = classNames.bind(styles);

function Sidebar() {
    // Lấy role
    const userRole = localStorage.getItem('userRole');
    const { fetchRecords } = useContext(RecordContext);
    return (
        <div className={cx('sidebar')}>
            {userRole != 'admin' ? (
                <div className={cx('btn-buy')}>
                    <button className={cx('sidebar-button')}>
                        <Link to="/vaccinereg">
                            <span className={cx('icon')}>💉 </span> Đăng kí tiêm vắc xin
                        </Link>
                    </button>
                </div>
            ) : (
                <div>
                    <div className={cx('btn-buy')}>
                        <button className={cx('sidebar-button')}>
                            <Link to="/adminVaccine">
                                <span className={cx('icon')}>💉 </span> Danh sách vắc xin
                            </Link>
                        </button>
                    </div>
                    <div className={cx('btn-buy')}>
                        <button className={cx('sidebar-button')}>
                            <Link to="/adminEmployee">
                                <span className={cx('icon')}>👨‍💼 </span> Danh sách nhân viên
                            </Link>
                        </button>
                    </div>
                    <div className={cx('btn-buy')}>
                        <button className={cx('sidebar-button')}>
                            <Link to="/adminHospital">
                                <span className={cx('icon')}>🏥 </span> Danh sách bệnh viện
                            </Link>
                        </button>
                    </div>
                </div>
            )}

            {userRole == 'admin' && userRole == 'staff' ? (
                <div className={cx('btn-add')}>
                    <button className={cx('sidebar-button')}>
                        <Link to="/createRecord">
                            <span className={cx('icon')}>➕ </span> Thêm hồ sơ
                        </Link>
                    </button>
                </div>
            ) : (
                <div className={cx('btn-add')}>
                    {/* <button className={cx('sidebar-button')}>
                        <Link to="/createRecord">
                            <span className={cx('icon')}>➕ </span> Thêm hồ sơ
                        </Link>
                    </button> */}
                </div>
            )}

            {userRole ? (
                <div className={cx('btn-recordList')}>
                    <button
                        className={cx('sidebar-button')}
                        onClick={() => {
                            fetchRecords(); // Gọi hàm fetchRecords khi nút được nhấn
                        }}
                    >
                        <Link to="/recordList">
                            <span className={cx('icon')}>📁</span> Hồ sơ bệnh nhân
                        </Link>
                    </button>
                </div>
            ) : (
                <div></div>
            )}

            {userRole ? (
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
