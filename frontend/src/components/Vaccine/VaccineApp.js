import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Vaccine.module.scss';

import VaccineList from './VaccineList';
import VaccineItem from './VaccineItem';

import { VaccineContext } from '~/Context/VaccineContext';

const cx = classNames.bind(styles);

function VaccineApp() {
    // Danh sách vaccine
    //const { vaccines, loading, error } = useContext(VaccineContext);
    // if (loading) return <div>Loading vaccines...</div>;
    // if (error) return <div>Error: {error}</div>;

    const vaccines = [
        {
            name: 'Vắc xin Shingrix',
            effect: 'Zona thần kinh',
            price: '3,890,000 VNĐ',
            origin: 'GSK(Bỉ)',
        },
        {
            name: 'Vắc xin Hắc lào',
            effect: 'Vắc xin Hắc lào',
            price: '3,890,000 VNĐ',
            origin: 'GSK(Bỉ)',
        },
        {
            name: 'Vắc xin hôi nách',
            effect: 'Vắc xin hôi nách',
            price: '3,890,000 VNĐ',
            origin: 'GSK(Bỉ)',
        },
    ];

    // danh sách Vaccine đã chọn
    const [selectedVaccines, setSelectedVaccines] = useState([]);

    // Hàm thêm Vaccine vào danh sách
    const handleSelectVaccine = (vaccine) => {
        setSelectedVaccines((prevSelected) => [...prevSelected, vaccine]);
    };

    // hàm xóa vaccine ra khỏi danh sách được chọn
    const handleDeleteVaccine = (vaccine) => {
        setSelectedVaccines((prevSelected) => prevSelected.filter((item) => item.name !== vaccine.name));
    };

    return (
        <div className={cx('vaccine-app')}>
            <div className={cx('vaccine-items')}>
                {vaccines.map((vaccine, index) => (
                    <VaccineItem
                        key={index}
                        vaccine={vaccine}
                        onSelect={handleSelectVaccine}
                        onchange={handleDeleteVaccine}
                    />
                ))}
            </div>

            {/*  */}
            <div className={cx('wrapper-selected')}>
                <VaccineList setSelectedVaccines={setSelectedVaccines} selectedVaccines={selectedVaccines} />
            </div>
        </div>
    );
}

export default VaccineApp;
