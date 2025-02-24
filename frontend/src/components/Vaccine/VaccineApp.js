import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Vaccine.module.scss';

import VaccineList from './VaccineList';
import VaccineItem from './VaccineItem';

import { VaccineContext } from '~/Context/VaccineContext';

const cx = classNames.bind(styles);

function VaccineApp() {
    // Danh sách vaccine
    const { vaccines } = useContext(VaccineContext);

    // Tạo mảng mới với thêm thuộc tính allowToChoose
    const { vaccinesWithAllow, setvaccinesWithAllow } = vaccines.map((vaccine) => ({
        ...vaccine,
        allowToChoose: true, // Thêm thuộc tính allowToChoose
    }));

    // danh sách Vaccine đã chọn
    const [selectedVaccines, setSelectedVaccines] = useState([]);

    // danh sách các loại vaccine đã chọn
    const [selectedEffectOfVaccines, setSelectedEffectOfVaccines] = useState([]);

    // Hàm thêm Vaccine vào danh sách
    const handleSelectVaccine = (vaccine) => {
        // Kiểm tra nếu đã có vaccine với cùng (effect) trong danh sách
        const isDuplicateEffect = selectedVaccines.some((selected) => selected.effect === vaccine.effect);
        if (isDuplicateEffect) {
            return; // Không thêm vaccine vào danh sách
        }
        // Thêm vaccine nếu không trùng effect
        setSelectedVaccines((prevSelected) => [...prevSelected, vaccine]);
        // Thêm effect vào danh sách effect đã chọn
        setSelectedEffectOfVaccines((prevSelected) => [...prevSelected, vaccine.effect]);
    };

    // hàm xóa vaccine ra khỏi danh sách được chọn
    const handleDeleteVaccine = (vaccine) => {
        setSelectedVaccines((prevSelected) => prevSelected.filter((item) => item.name !== vaccine.name));
        setSelectedEffectOfVaccines((prevSelected) => prevSelected.filter((item) => item !== vaccine.effect));
    };

    return (
        <div className={cx('vaccine-app')}>
            <div className={cx('vaccine-items')}>
                {vaccines.map((vaccine, index) => (
                    <VaccineItem
                        key={index}
                        vaccine={vaccine}
                        selectedEffectOfVaccines={selectedEffectOfVaccines}
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
