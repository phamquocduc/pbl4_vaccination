import classNames from 'classnames/bind';
import styles from './AddEditVaccine.module.scss';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { VaccineContext } from '~/Context/VaccineContext';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddEditVaccine() {
    const { createVaccine, updateVaccine, getVaccineById } = useContext(VaccineContext);

    // Nhận state nếu là sửa thông tin:
    const location = useLocation();
    const handleEdit = location.state?.handle || ''; // Nhận giá trị vaccine_ID (profile_ID)
    console.log(handleEdit);

    // Lấy dữ liệu record cần sửa
    // const myVaccine = getVaccineById(handleEdit);
    // console.log(myVaccine);
    // Lấy dữ liệu record cần sửa
    useEffect(() => {
        const fetchMyVaccine = async () => {
            try {
                if (handleEdit) {
                    // Chỉ fetch nếu có handleEdit
                    const myVaccine = await getVaccineById(handleEdit);
                    console.log('Thông tin vaccine:', myVaccine);

                    // Cập nhật state vaccine
                    setVaccine({
                        name: myVaccine.name || '',
                        origin: myVaccine.origin || '',
                        type: myVaccine.type || '',
                        effect: myVaccine.effect || '',
                        doseNumber: myVaccine.doseNumber || 0,
                        durationIntervals: myVaccine.durationIntervals || 0,
                        availableDoses: myVaccine.availableDoses || 0,
                        price: myVaccine.price || 0,
                        images: myVaccine.images || [],
                    });
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi lấy vaccine:', error);
            }
        };

        fetchMyVaccine();
    }, [handleEdit]); // Chỉ gọi lại khi handleEdit thay đổi

    const [vaccine, setVaccine] = useState({
        name: '',
        origin: '',
        type: '',
        effect: '',
        doseNumber: 0,
        durationIntervals: 0,
        availableDoses: 0,
        price: 0,
        images: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVaccine({
            ...vaccine,
            [name]:
                name === 'price' || name === 'doseNumber' || name === 'durationIntervals' || name === 'availableDoses'
                    ? parseInt(value) || 0
                    : value,
        });
    };

    const handleAddVaccine = () => {
        {
            handleEdit == '' ? createVaccine(vaccine) : updateVaccine(handleEdit, vaccine);
        }
    };

    return (
        <div className={cx('container-AddEditVaccine')}>
            <h1>Thêm Vắc-xin Mới</h1>
            <form>
                <div className={cx('form-group')}>
                    <label>Tên vắc-xin:</label>
                    <input type="text" name="name" value={vaccine.name} onChange={handleInputChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Xuất xứ:</label>
                    <input type="text" name="origin" value={vaccine.origin} onChange={handleInputChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Loại:</label>
                    <input type="text" name="type" value={vaccine.type} onChange={handleInputChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Tác dụng:</label>
                    <input type="text" name="effect" value={vaccine.effect} onChange={handleInputChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Số mũi:</label>
                    <input
                        type="number"
                        name="doseNumber"
                        value={vaccine.doseNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Khoảng cách giữa các mũi (ngày):</label>
                    <input
                        type="number"
                        name="durationIntervals"
                        value={vaccine.durationIntervals}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Số liều còn lại:</label>
                    <input
                        type="number"
                        name="availableDoses"
                        value={vaccine.availableDoses}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Giá (VND):</label>
                    <input type="number" name="price" value={vaccine.price} onChange={handleInputChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Hình ảnh (URL, nếu có):</label>
                    <input
                        type="text"
                        name="images"
                        value={vaccine.images}
                        onChange={(e) => setVaccine({ ...vaccine, images: [e.target.value] })}
                    />
                </div>
                <button type="button" className={cx('submit-button')} onClick={handleAddVaccine}>
                    Thêm Vắc-xin
                </button>
            </form>
        </div>
    );
}

export default AddEditVaccine;
