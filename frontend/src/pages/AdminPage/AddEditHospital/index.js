import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './AddEditHospital.module.scss';

const cx = classNames.bind(styles);

function AddEditHospital() {
    const [hospital, setHospital] = useState({
        name: '',
        address: '',
        phone: '',
        capacity: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHospital({
            ...hospital,
            [name]: name === 'capacity' ? parseInt(value) || 0 : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(hospital.phone)) {
            alert('Số điện thoại phải là 10 chữ số!');
            return;
        }

        console.log('Hospital Information Submitted: ', hospital);
        alert('Bệnh viện mới đã được thêm thành công!');
        // Thêm API call tại đây nếu cần
    };

    return (
        <div className={cx('container-AddEditHospital')}>
            <h1>Thêm Bệnh Viện Mới</h1>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label>Tên bệnh viện:</label>
                    <input type="text" name="name" value={hospital.name} onChange={handleInputChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Địa chỉ:</label>
                    <input type="text" name="address" value={hospital.address} onChange={handleInputChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Số điện thoại:</label>
                    <input type="text" name="phone" value={hospital.phone} onChange={handleInputChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Sức chứa:</label>
                    <input
                        type="number"
                        name="capacity"
                        value={hospital.capacity}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className={cx('submit-button')}>
                    Thêm Bệnh Viện
                </button>
            </form>
        </div>
    );
}
export default AddEditHospital;
