import { useState } from 'react';
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(hospital.phone)) {
            alert('Số điện thoại phải là 10 chữ số!');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post('http://localhost:3000/vaccination-center', hospital, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*',
                },
            });
            console.log('Bệnh viện đã được thêm thành công: ', response.data);
            alert('Bệnh viện mới đã được thêm thành công!');
        } catch (error) {
            console.error('Lỗi khi thêm bệnh viện:', error);
            alert('Không thể thêm bệnh viện.');
        }
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
