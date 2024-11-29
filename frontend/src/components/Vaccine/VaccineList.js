import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Vaccine.module.scss';

import { SelectVaccinesContext } from '~/Context/SelectVaccinesContext';

const cx = classNames.bind(styles);

function VaccineList({ selectedVaccines, setSelectedVaccines }) {
    const navigate = useNavigate();
    const { selectVaccines, AddVaccine, setSelectVaccines } = useContext(SelectVaccinesContext);

    const handleClearAll = () => {
        setSelectedVaccines([]);
    };
    const handleBuy = () => {
        // setSelectVaccines((prev) => [...prev, selectedVaccines]);
        setSelectVaccines(selectedVaccines);
        navigate('/BookingDatePage');
    };

    React.useEffect(() => {
        console.log(selectVaccines); // Xem khi nào giá trị thực sự thay đổi
    }, [selectVaccines]);

    return (
        <div className={cx('vaccine-list')}>
            <div className={cx('inner')}>
                <div className={cx('vaccine-choose-header')}>
                    <FontAwesomeIcon icon={faFileInvoice} style={{ color: '#2a388f', fontSize: '2.2rem' }} />
                    <h3>DANH SÁCH VẮC XIN CHỌN MUA</h3>
                </div>
                {selectedVaccines.length === 0 ? (
                    <div className={cx('vaccine-choose-content')}>
                        <FontAwesomeIcon icon={faBan} style={{ color: '#ccc', fontSize: '5rem' }} />{' '}
                        <p>DANH SÁCH TRỐNG</p>
                    </div>
                ) : (
                    <div>
                        <ul>
                            {selectedVaccines.map((vaccine, index) => (
                                <li key={index}>
                                    {vaccine.name} - {vaccine.price}
                                </li>
                            ))}
                        </ul>
                        <button type="button" onClick={handleBuy}>
                            ĐĂNG KÍ MŨI TIÊM
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VaccineList;
