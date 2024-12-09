import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './AddEditEmployee.module.scss';

const cx = classNames.bind(styles);

function AddEditEmployee() {
    const [employee, setEmployee] = useState({
        fullName: '',
        email: '',
        passWord: '',
        confirmPassWord: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (employee.passWord !== employee.confirmPassWord) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        console.log('Employee Information Submitted: ', employee);
        alert('Nhân viên mới đã được thêm thành công!');
        // Thêm API call tại đây nếu cần
    };

    return (
        <div className={cx('container-AddEditEmployee')}>
            <h1>Thêm Nhân Viên Mới</h1>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label>Họ và tên:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={employee.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Email:</label>
                    <input type="email" name="email" value={employee.email} onChange={handleInputChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="passWord"
                        value={employee.passWord}
                        onChange={handleInputChange}
                        required
                        minLength="8"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        name="confirmPassWord"
                        value={employee.confirmPassWord}
                        onChange={handleInputChange}
                        required
                        minLength="8"
                    />
                </div>
                <button type="submit" className={cx('submit-button')}>
                    Thêm Nhân Viên
                </button>
            </form>
        </div>
    );
}
export default AddEditEmployee;
