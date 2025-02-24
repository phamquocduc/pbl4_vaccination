import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './AdminHospital.module.scss';

const cx = classNames.bind(styles);

function AdminHospital() {
    const navigate = useNavigate();

    const [hospitals, setHospitals] = useState([]);

    // Lấy danh sách bệnh viện từ API
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:3000/vaccination-center', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: '*/*',
                    },
                });
                setHospitals(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bệnh viện:', error);
                alert('Không thể lấy danh sách bệnh viện.');
            }
        };
        fetchHospitals();
    }, []);

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
                        {/* <th></th> */}
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
                                {/* <td>
                                    <button
                                        onClick={() => {
                                            navigate('/addEditHospital', {
                                                state: { handle: hospital.id }, // Truyền ID bệnh viện khi chỉnh sửa
                                            });
                                        }}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </td> */}
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
                        navigate('/addEditHospital'); // Không truyền state, vì đây là thêm mới
                    }}
                >
                    Thêm bệnh viện
                </button>
            </div>
        </div>
    );
}

export default AdminHospital;
