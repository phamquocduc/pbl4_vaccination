import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Vaccine.module.scss';

import VaccineList from './VaccineList';
import VaccineItem from './VaccineItem';

const cx = classNames.bind(styles);

function VaccineApp() {
    // Danh sách vaccine
    const vaccines = [
        {
            name: 'Vắc xin Shingrix',
            disease: 'Zona thần kinh',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Hắc lào',
            disease: 'Vắc xin Hắc lào',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Shingrix',
            disease: 'Zona thần kinh',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Hắc lào',
            disease: 'Vắc xin Hắc lào',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Hắc lào',
            disease: 'Vắc xin Hắc lào',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Shingrix',
            disease: 'Zona thần kinh',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Hắc lào',
            disease: 'Vắc xin Hắc lào',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Hắc lào',
            disease: 'Vắc xin Hắc lào',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Shingrix',
            disease: 'Zona thần kinh',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Hắc lào',
            disease: 'Vắc xin Hắc lào',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Hắc lào',
            disease: 'Vắc xin Hắc lào',
            price: '3,890,000 VNĐ',
        },
        {
            name: 'Vắc xin Shingrix',
            disease: 'Zona thần kinh',
            price: '3,890,000 VNĐ',
        },
    ];

    // danh sách Vaccine đã chọn
    const [selectedVaccines, setSelectedVaccines] = useState([]);

    // Hàm thêm Vaccine vào danh sách
    const handleSelectVaccine = (vaccine) => {
        setSelectedVaccines((prevSelected) => [...prevSelected, vaccine]);
    };

    return (
        <div className={cx('vaccine-app')}>
            <div className={cx('vaccine-items')}>
                {vaccines.map((vaccine, index) => (
                    <VaccineItem key={index} vaccine={vaccine} onSelect={handleSelectVaccine} />
                ))}
            </div>
            <div className={cx('wrapper-selected')}>
                <VaccineList setSelectedVaccines={setSelectedVaccines} selectedVaccines={selectedVaccines} />
            </div>
        </div>
    );
}

export default VaccineApp;
