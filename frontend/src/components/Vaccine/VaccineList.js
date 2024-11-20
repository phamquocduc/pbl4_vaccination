import React from 'react';
import classNames from 'classnames/bind';
import styles from './Vaccine.module.scss';

const cx = classNames.bind(styles);

function VaccineList({ selectedVaccines, setSelectedVaccines }) {
    const handleClearAll = () => {
        setSelectedVaccines([]);
    };
    return (
        <div className={cx('vaccine-list')}>
            <div className={cx('inner')}>
                <h3>DANH SÁCH VẮC XIN CHỌN MUA</h3>
                {selectedVaccines.length === 0 ? (
                    <div>Danh sách trống</div>
                ) : (
                    <div>
                        <ul>
                            {selectedVaccines.map((vaccine, index) => (
                                <li key={index}>
                                    {vaccine.name} - {vaccine.price}
                                </li>
                            ))}
                        </ul>
                        <button type="button" onClick={handleClearAll}>
                            Xóa tất cả
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VaccineList;
