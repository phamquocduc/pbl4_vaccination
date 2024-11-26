import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './RecordSelector.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faCakeCandles,
    faCircleUser,
    faEnvelope,
    faHandshake,
    faMapLocationDot,
    faPhone,
    faPlus,
    faRotateLeft,
    faTrashCan,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import { SelectVaccinesContext } from '~/Context/SelectVaccinesContext';
import { RecordContext } from '~/Context/RecordContext';

const cx = classNames.bind(styles);

function RecordSelector() {
    const navigate = useNavigate();
    //Danh sách records
    const { records, deleteRecord } = useContext(RecordContext);

    const { ChooseRecord } = useContext(SelectVaccinesContext);

    const [focusedIndex, setFocusedIndex] = useState(null);

    const handleFocus = (index) => {
        setFocusedIndex(index);
    };

    // const handleBlur = (index) => {
    //     setFocusedIndex(!index);
    // };

    // bấm nút xác nhận
    const handleSubmit = () => {
        navigate('/ConfirmInformation');
    };

    return (
        <div className={cx('recordSelector-wrapper')}>
            <div className={cx('record-info')}>
                <div className={cx('title')}>
                    <h1>Chọn hồ sơ bệnh nhân</h1>
                </div>
                <div className={cx('record-list')}>
                    {records.map((record, index) => (
                        <div
                            key={index} // Đảm bảo mỗi phần tử có key duy nhất
                            className={cx('user-card', { focused: focusedIndex === index })}
                            onFocus={() => handleFocus(index)}
                            // onBlur={handleBlur}
                            tabIndex={0} // Để element có thể nhận focus
                        >
                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon
                                        icon={faCircleUser}
                                        className={cx('icon-card')}
                                        style={{ fontSize: '2.2rem' }}
                                    />
                                    {/* <div className={cx('title-card')}>Họ và tên:</div> */}
                                </div>
                                <div className={cx('content-card')} style={{ color: '#00B5F1' }}>
                                    <h3>{record.fullName}</h3>
                                </div>
                            </div>

                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faHandshake} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Mối quan hệ:</div>
                                </div>
                                <div className={cx('content-card')}>{record.relationship}</div>
                            </div>

                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faCakeCandles} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Ngày Sinh:</div>
                                </div>
                                <div className={cx('content-card')}>{record.dob} </div>
                            </div>

                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faPhone} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Số điện thoại:</div>
                                </div>
                                <div className={cx('content-card')}>{record.phone}</div>
                            </div>

                            <div className={cx('card-item')}>
                                <div className={cx('ant-space')}>
                                    <FontAwesomeIcon icon={faMapLocationDot} className={cx('icon-card')} />
                                    <div className={cx('title-card')}>Địa chỉ:</div>
                                </div>
                                <div className={cx('content-card')}>{record.address}</div>
                            </div>

                            {focusedIndex === index && (
                                <>
                                    <div className={cx('card-item')}>
                                        <div className={cx('ant-space')}>
                                            <FontAwesomeIcon icon={faVenusMars} className={cx('icon-card')} />
                                            <div className={cx('title-card')}>Giới tính:</div>
                                        </div>
                                        <div className={cx('content-card')}>{record.gender}</div>
                                    </div>
                                    <div className={cx('card-item')}>
                                        <div className={cx('ant-space')}>
                                            <FontAwesomeIcon icon={faEnvelope} className={cx('icon-card')} />
                                            <div className={cx('title-card')}>Email:</div>
                                        </div>
                                        <div className={cx('content-card')}>{record.email}</div>
                                    </div>

                                    <div className={cx('btnGr-wrapper')}>
                                        <div className={cx('button-group')}>
                                            <div>
                                                <button
                                                    className={cx('button', 'delete')}
                                                    onClick={() => deleteRecord(record.email)}
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} className={cx('icon-btn')} />
                                                    <span>Xóa</span>
                                                </button>

                                                <button className={cx('button', 'edit')}>
                                                    <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-btn')} />
                                                    <span>Sửa</span>
                                                </button>
                                            </div>
                                            <button
                                                className={cx('button', 'continue')}
                                                onClick={() => {
                                                    ChooseRecord(record);
                                                    handleSubmit();
                                                }}
                                            >
                                                <span>Tiếp tục </span>
                                                <FontAwesomeIcon
                                                    icon={faArrowRight}
                                                    className={cx('icon-btn', 'continue')}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('style-btnWrapper')}>
                <button onClick={() => navigate(-1)} className={cx('button', 'return')}>
                    <span>Quay lại</span>
                    <FontAwesomeIcon icon={faRotateLeft} className={cx('icon-btn')} />
                </button>
                <button
                    className={cx('button', 'addProfile')}
                    onClick={() => {
                        navigate('/createRecord');
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} className={cx('icon-btn')} />
                    <span>Thêm hồ sơ</span>
                </button>
            </div>
        </div>
    );
}

export default RecordSelector;
