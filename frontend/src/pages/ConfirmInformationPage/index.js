import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ConfirmInformation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faPhone, faPlus, faRotateLeft, faVenusMars } from '@fortawesome/free-solid-svg-icons';

import { useContext } from 'react';
import { faCalendarDays, faEnvelope, faHandshake, faUser } from '@fortawesome/free-regular-svg-icons';

import { SelectVaccinesContext } from '~/Context/SelectVaccinesContext';
import { RecordContext } from '~/Context/RecordContext';
const cx = classNames.bind(styles);
function ConfirmInformation() {
    const navigate = useNavigate();

    const { selectVaccines, selectedDate, selectedTime, selectedRecord, DeleteVaccine } =
        useContext(SelectVaccinesContext);
    const { records } = useContext(RecordContext);

    const log = () => {
        console.log();
    };

    return (
        <div className={cx('confirm-wrapper')}>
            <div className={cx('confirmInfo')}>
                <div className={cx('central-information')}>
                    <div className={cx('hospital-info-container')}>
                        <h3 className={cx('hospital-info-title')}>Thông tin cơ sở y tế</h3>
                        <div className={cx('hospital-info-details')}>
                            <div className={cx('hospital-info-item')}>
                                <span className={cx('hospital-icon')}>🏥</span>
                                <span className={cx('hospital-text')}>{/*hospitalData.hospitalName*/}</span>
                            </div>
                            <div className={cx('hospital-info-item')}>
                                <span className={cx('phone-icon')}>📞</span>
                                <span className={cx('hospital-text')}>{/*hospitalData.phoneNumber*/}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('CFinformation-wrapper')}>
                    <div className={cx('CFVaccine')}>
                        <div className={cx('panelHeader')}>
                            <span>Xác nhận thông tin khám</span>
                        </div>
                        <div className={cx('CFinfor')}>
                            <table className={cx('info-table')}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Dịch vụ</th>
                                        <th>Phòng ngừa bệnh</th>
                                        <th>Thời gian</th>
                                        <th>Tiền Khám</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectVaccines.map((vaccine, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{vaccine.name}</td>
                                            <td>{vaccine.effect}</td>
                                            <td>
                                                <div>{selectedDate}</div>
                                                <div>{selectedTime}</div>
                                            </td>
                                            <td>{vaccine.price} VNĐ</td>
                                            <td>
                                                <button
                                                    className={cx('delete-btn')}
                                                    title="Xóa"
                                                    onClick={() => DeleteVaccine(vaccine)}
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={cx('CFRecord')}>
                        <div className={cx('panelHeader')}>
                            <span>Thông tin bệnh nhân</span>
                        </div>

                        <div className={cx('recordInfor')}>
                            <div className={cx('info-row')}>
                                <div className={cx('info-item')}>
                                    <span className={cx('label')}>
                                        <FontAwesomeIcon icon={faUser} className={cx('icon-label')} /> Họ và tên:
                                    </span>
                                    <span className={cx('value')}> {selectedRecord.fullName} </span>
                                </div>

                                <div className={cx('info-item')}>
                                    <span className={cx('label')}>
                                        <FontAwesomeIcon icon={faVenusMars} className={cx('icon-label')} /> Giới tính:
                                    </span>
                                    <span className={cx('value')}> {selectedRecord.gender} </span>
                                </div>
                            </div>
                            <div className={cx('info-row')}>
                                <div className={cx('info-item')}>
                                    <span className={cx('label')}>
                                        <FontAwesomeIcon icon={faCalendarDays} className={cx('icon-label')} />
                                        Ngày sinh:
                                    </span>
                                    <span className={cx('value')}> {selectedRecord.dob} </span>
                                </div>

                                <div className={cx('info-item')}>
                                    <span className={cx('label')}>
                                        <FontAwesomeIcon icon={faHandshake} className={cx('icon-label')} />
                                        Quan hệ:
                                    </span>
                                    <span className={cx('value')}> {selectedRecord.relationship} </span>
                                </div>
                            </div>
                            <div className={cx('info-row')}>
                                <div className={cx('info-item')}>
                                    <span className={cx('label')}>
                                        <FontAwesomeIcon icon={faEnvelope} className={cx('icon-label')} />
                                        Email:
                                    </span>
                                    <span className={cx('value')}>{selectedRecord.email}</span>
                                </div>
                                <div className={cx('info-item')}>
                                    <span className={cx('label')}>
                                        <FontAwesomeIcon icon={faPhone} className={cx('icon-label')} />
                                        Số điện thoại:
                                    </span>
                                    <span className={cx('value')}>{selectedRecord.phone}</span>
                                </div>
                            </div>
                            <div className={cx('info-row')}>
                                {/* <div className={cx('info-item')}>
                                    <span className={cx('label')}>Mã số BHYT:</span>
                                    <span className={cx('value')}>Chưa cập nhật</span>
                                </div> */}
                                <div className={cx('info-item')}>
                                    <span className={cx('label')}>
                                        <FontAwesomeIcon icon={faMapLocationDot} className={cx('icon-label')} />
                                        Địa chỉ:
                                    </span>
                                    <span className={cx('value')}>{selectedRecord.address}</span>
                                </div>
                            </div>
                            <div className={cx('note')}>
                                <span>
                                    ❗ Trong thời gian quy định, nếu quý khách hủy phiếu khám sẽ được hoàn lại tiền khám
                                    và các dịch vụ đặt (không bao gồm phí tiện ích).
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('style-btnWrapper')}>
                        <button onClick={() => navigate(-1)} className={cx('button', 'return')}>
                            <span>Quay lại</span>
                            <FontAwesomeIcon
                                icon={faRotateLeft}
                                className={cx('icon-btn')}
                                style={{ paddingLeft: '5px' }}
                            />
                        </button>
                        <button
                            className={cx('button', 'addProfile')}
                            // onClick={() => {
                            //     navigate('/createRecord');
                            // }}
                        >
                            <FontAwesomeIcon icon={faPlus} className={cx('icon-btn')} style={{ paddingRight: '5px' }} />
                            <span>Xác nhận</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmInformation;
