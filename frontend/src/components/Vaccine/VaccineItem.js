import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Vaccine.module.scss';

const cx = classNames.bind(styles);

function VaccineItem({ vaccine, selectedEffectOfVaccines, onSelect, onchange }) {
    const isDuplicateEffect = selectedEffectOfVaccines.some((selected) => selected === vaccine.effect);

    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        if (!isDuplicateEffect && !isSelected) {
            onSelect(vaccine); //Thêm vaccine
            setIsSelected(!isSelected); // Chuyển trạng thái khi bấm lại}
        } else if (isDuplicateEffect && isSelected) {
            onchange(vaccine); // Xóa vaccine
            setIsSelected(!isSelected); // Chuyển trạng thái khi bấm lại}
        } else if (isDuplicateEffect && !isSelected) {
            alert(`Bạn chỉ có thể chọn một vaccine cho một bệnh "${vaccine.effect}".`);
        }
        console.log(isDuplicateEffect);
        console.log('Before Select:', selectedEffectOfVaccines);
    };

    return (
        <div
            className={cx(
                'vaccine-item',
                // { selected: isSelected }
            )}
        >
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
