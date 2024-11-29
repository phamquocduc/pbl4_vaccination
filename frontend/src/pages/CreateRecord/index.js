import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './CreateRecord.module.scss';

const cx = classNames.bind(styles);

function CreateRecord() {
    //  Lưu thông tin từ các input
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        relationship: '',
        gender: '',
        phone: '',
        email: '',
        province: '',
        district: '',
        ward: '',
        address: '',
    });

    //xử lý thay đổi trong các input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kết nối với Database
        console.log('Lưu vào Database:', formData);
        alert('Thông tin đã được lưu thành công!');
        // Chỗ ni là đoạn làm việc với data nè
    };

    // xử lý khi nhấn nút "Nhập lại"
    const handleReset = () => {
        setFormData({
            name: '',
            dob: '',
            relationship: '',
            gender: '',
            phone: '',
            email: '',
            province: '',
            district: '',
            ward: '',
            address: '',
        });
    };

    return (
        <form className={cx('wrapper')} onSubmit={handleSubmit}>
            <h2>Nhập thông tin bệnh nhân</h2>
            <div className={cx('notify')}>
                <p>
                    Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất. Trong trường hợp cung cấp sai thông
                    tin bệnh nhân & điện thoại, việc xác nhận cuộc hẹn sẽ không hiệu lực trước khi đặt khám.
                </p>
            </div>
            <div className={cx('form-row')}>
                <div className={cx('form-group')}>
                    <label>Tên:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Quan hệ:</label>

                    {/* <select name="relationship" value={formData.relationship} onChange={handleChange} required>
                        <option value="Bản thân">Bản thân</option>
                        <option value="Con">Con</option>
                        <option value="Ba/Mẹ">Ba/Mẹ</option>
                        <option value="Anh/Chị/Em">Anh/Chị/Em</option>
                        <option value="Khác">Khác </option>
                    </select> */}
                </div>
            </div>

            <div className={cx('form-row')}>
                <div className={cx('form-group')}>
                    <label>Ngày tháng năm sinh:</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Giới tính:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
            </div>

            <div className={cx('form-row')}>
                <div className={cx('form-group')}>
                    <label>Số điện thoại:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
            </div>

            <div className={cx('form-row')}>
                <div className={cx('form-group')}>
                    <label>Tỉnh/Thành:</label>
                    <input type="text" name="province" value={formData.province} onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Quận/Huyện:</label>
                    <input type="text" name="district" value={formData.district} onChange={handleChange} required />
                </div>
            </div>

            <div className={cx('form-row')}>
                <div className={cx('form-group')}>
                    <label>Phường/Xã:</label>
                    <input type="text" name="ward" value={formData.ward} onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Địa chỉ:</label>
                    <input name="address" value={formData.address} onChange={handleChange} required />
                </div>
            </div>

            <div className={cx('btn')}>
                <button type="submit">Tạo mới</button>
                <button type="button" onClick={handleReset}>
                    Nhập lại
                </button>
            </div>
        </form>
    );
}

export default CreateRecord;
