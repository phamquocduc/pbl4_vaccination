import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ConfirmInformation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faPhone, faPlus, faRotateLeft, faVenusMars } from '@fortawesome/free-solid-svg-icons';

import { useContext, useState } from 'react';
import { faCalendarDays, faEnvelope, faHandshake, faUser } from '@fortawesome/free-regular-svg-icons';

import { SelectVaccinesContext } from '~/Context/SelectVaccinesContext';
import { RecordContext } from '~/Context/RecordContext';
import { VaccineContext } from '~/Context/VaccineContext';
import axios from 'axios';

const cx = classNames.bind(styles);
function ConfirmInformation() {
    const navigate = useNavigate();

    const { selectVaccines, selectedDate, selectedTime, selectedRecord, DeleteVaccine } =
        useContext(SelectVaccinesContext);
    const { records } = useContext(RecordContext);
    const { vaccines } = useContext(VaccineContext);

    const log = () => {
        console.log();
    };
    const [orid, setOrid] = useState();
    const createReservation = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }
            const response = await axios.post(
                'http://localhost:3000/user/create-vaccine-reservation',
                {
                    profileId: selectedRecord.id,
                    vaccineIds: selectVaccines.map((curr) => curr.id),
                    vaccinationCenterId: 1,
                    appointmentDate: selectedDate,
                    paymentMethod: 'VNpay',
                    price: selectVaccines.reduce((sum, vaccine) => {
                        return sum + vaccine.price;
                    }, 0),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Thêm token vào header
                    },
                },
            );
            const orderId = await response.data.orderId;
            setOrid(orderId);
            alert('Xác nhận thành công!!!');
        } catch (err) {
            console.error('Error fetching vaccines:', err);
        }
    };

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                console.error('Không tìm thấy token. Người dùng chưa đăng nhập.');
                return;
            }
            // Dữ liệu gửi đến API
            const paymentData = {
                orderInfo: orid,
                amount: selectVaccines.reduce((sum, vaccine) => {
                    return sum + vaccine.price;
                }, 0), // Số tiền thanh toán (VNĐ)
                returnUrl: 'http://localhost:3001/returnPage', // URL trả về sau thanh toán
            };

            // Gửi yêu cầu POST đến API
            const response = await axios.post('http://localhost:3000/vnpay/create-payment', paymentData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            });

            if (response.status === 201) {
                // Chuyển hướng đến trang thanh toán của VNPay
                window.location.href = response.data.paymentUrl; // paymentUrl được trả về từ API
            } else {
                alert('Có lỗi xảy ra khi tạo thanh toán.');
            }
        } catch (error) {
            console.error('Lỗi khi xử lý thanh toán:', error);
            alert('Không thể thực hiện thanh toán. Vui lòng thử lại.');
        }
    };

    // "profileId": 1,
    // "vaccineId": 1,
    // "vaccinationCenterId": 1,
    // "appointmentDate": "2024-04-15",

    //hàm tính ngày tiêm mũi 2
    function calculateNextDate(date, days) {
        const selectedDateObj = new Date(date); // Chuyển selectedDate thành đối tượng Date
        selectedDateObj.setDate(selectedDateObj.getDate() + days); // Thêm số ngày từ doseNumber
        return selectedDateObj.toLocaleDateString('vi-VN'); // Trả về định dạng DD-MM-YYYY
    }

    const [isSubmit, setIsSubmit] = useState(false);

    const handSubmit = () => {
        setIsSubmit(!isSubmit);
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
                                        <th>Số mũi tiêm</th>
                                        <th>-Thời gian-</th>
                                        <th>Thời gian mũi 2</th>
                                        <th>Giá vắc xin</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectVaccines.map((vaccine, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{vaccine.name}</td>
                                            <td>{vaccine.effect}</td>
                                            <td>{vaccine.doseNumber}</td>
                                            <td>
                                                <div>{selectedDate}</div>
                                                <div>{selectedTime}</div>
                                            </td>
                                            <td>{calculateNextDate(selectedDate, vaccine.doseNumber)}</td>
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

                    <div className={cx('btnWrapper')}>
                        {!isSubmit ? (
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
                                    onClick={() => {
                                        createReservation();
                                        handSubmit();
                                        //navigate('/createRecord');
                                        // console.log(orderId)
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={cx('icon-btn')}
                                        onClick={handSubmit}
                                        style={{ paddingRight: '5px' }}
                                    />
                                    <span>Xác nhận</span>
                                </button>
                            </div>
                        ) : (
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
                                    onClick={() => {
                                        handlePayment();
                                        //createReservation();
                                        //navigate('/createRecord');
                                        // console.log(orderId)
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={cx('icon-btn')}
                                        style={{ paddingRight: '5px' }}
                                    />
                                    <span>Thanh toán với VNpay</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmInformation;
