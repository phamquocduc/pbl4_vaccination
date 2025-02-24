import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Vaccine.module.scss';

const cx = classNames.bind(styles);

function VaccineItem({ vaccine, onSelect }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        if (!isSelected) {
            onSelect(vaccine);
        }
        setIsSelected(!isSelected); // Chuyển trạng thái khi bấm lại
    };

    return (
        <div className={cx('vaccine-item', { selected: isSelected })}>
            <h4>{vaccine.name}</h4>
            <p>Phòng bệnh: {vaccine.disease}</p>
            <p>Giá: {vaccine.price}</p>
            <button onClick={handleSelect} className={cx(isSelected ? 'selected-button' : '')}>
                {isSelected ? 'ĐÃ CHỌN' : 'CHỌN'}
            </button>
        </div>
    );
}
export default VaccineItem;
// function VaccineItem({ vaccine, onSelect, isSelected }) {
//   const handleSelect = () => {
//     //onSelect(vaccine);
//     if (!isSelected) {
//       onSelect(vaccine);
//     }
//     //setIsSelected(!isSelected); // Chuyển trạng thái khi bấm lại
//   };
//   return (
//     <div className={`vaccine-item ${isSelected ? "selected" : ""}`}>
//       <h4>{vaccine.name}</h4>
//       <p>Phòng bệnh: {vaccine.disease}</p>
//       <p>Giá: {vaccine.price}</p>
//       <button
//         onClick={handleSelect}
//         className={isSelected ? "selected-button" : ""}
//       >
//         {isSelected ? "ĐÃ CHỌN" : "CHỌN"}
//       </button>
//     </div>
//   );
// }

// export default VaccineItem;
