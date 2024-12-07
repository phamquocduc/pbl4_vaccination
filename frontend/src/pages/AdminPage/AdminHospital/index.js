import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminHospital.module.scss';

//import { HospitalContext } from '~/Context/HospitalContext';

const cx = classNames.bind(styles);

function AdminHospital() {
    //const { hospitals } = useContext(HospitalContext); // Lấy danh sách bệnh viện từ Context
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([
        {
            name: 'VCN Đà Nẵng',
            address: 'Hải Châu, Đà Nẵng',
            phone: '0111222333',
            capacity: 200,
        },
    ]);

    return (
        <div className={cx('hospitalList')}>
            <h1>Danh sách bệnh viện</h1>
            <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Tên bệnh viện</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Sức chứa</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {hospitals.length > 0 ? (
                        hospitals.map((hospital, index) => (
                            <tr key={hospital.id}>
                                <td>{index + 1}</td>
                                <td>{hospital.name}</td>
                                <td>{hospital.address}</td>
                                <td>{hospital.phone}</td>
                                <td>{hospital.capacity}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            navigate('/addEditHospital', {
                                                state: { handle: hospital.id },
                                            });
                                        }}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={cx('wrapperButton')}>
                <button
                    className={cx('addHospitalButton')}
                    onClick={() => {
                        navigate('/addEditHospital');
                    }}
                >
                    Thêm bệnh viện
                </button>
            </div>
        </div>
    );
}

export default AdminHospital;
