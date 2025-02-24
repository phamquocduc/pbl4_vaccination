import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminVaccine.module.scss';

import { VaccineContext } from '~/Context/VaccineContext';

const cx = classNames.bind(styles);

function AdminVaccine() {
    const { vaccines, fetchVaccines } = useContext(VaccineContext);

    const navigate = useNavigate();

    return (
        <div className={cx('vaccineList')}>
            <h1>Danh sách vắc-xin</h1>
            <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Tên</th>
                        <th>Xuất xứ</th>
                        <th>Loại</th>
                        <th>Tác dụng</th>
                        <th>Số liều</th>
                        <th>Số mũi</th>
                        <th>Khoảng cách (ngày)</th>
                        <th>Giá</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {vaccines.length > 0 ? (
                        vaccines.map((vaccine, index) => (
                            <tr key={vaccine.id}>
                                <td>{index + 1}</td>
                                <td>{vaccine.name}</td>
                                <td>{vaccine.origin}</td>
                                <td>{vaccine.type}</td>
                                <td>{vaccine.effect}</td>
                                <td>{vaccine.availableDoses.toLocaleString()}</td>
                                <td>{vaccine.doseNumber}</td>
                                <td>{vaccine.durationIntervals}</td>
                                <td>{vaccine.price}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            navigate('/addEditVaccine', {
                                                state: { handle: vaccine.id },
                                            });
                                        }}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={cx('wrapperButton')}>
                <button
                    className={cx('addVaccineButton')}
                    onClick={() => {
                        navigate('/addEditVaccine');
                    }}
                >
                    Thêm vắc xin
                </button>
            </div>
        </div>
    );
}

export default AdminVaccine;
