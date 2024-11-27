import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Vaccine.module.scss';

const cx = classNames.bind(styles);

function VaccineItem({ vaccine, onSelect, onchange }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        if (!isSelected) {
            onSelect(vaccine); //Thêm vaccine
        } else {
            onchange(vaccine); // Xóa vaccine
        }
        setIsSelected(!isSelected); // Chuyển trạng thái khi bấm lại
    };

    return (
        <div className={cx('vaccine-item', { selected: isSelected })}>
            <div className={cx('info-vaccine-vaccinItems')}>
                <h4>{vaccine.name}</h4>
                <p>Nguồn gốc: {vaccine.origin}</p>
                <p>Giá: {vaccine.price}</p>
                <p>Phòng bệnh: {vaccine.effect}</p>
            </div>

            <div>
                <button onClick={handleSelect} className={cx(isSelected ? 'selected-button-vaccinItems' : '')}>
                    {isSelected ? 'ĐÃ CHỌN' : 'CHỌN'}
                </button>
            </div>
        </div>
    );
}
export default VaccineItem;
