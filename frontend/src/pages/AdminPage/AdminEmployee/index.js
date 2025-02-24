import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './AdminEmployee.module.scss';

const cx = classNames.bind(styles);

function AdminEmployee() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    // Lấy danh sách nhân viên từ API
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:3000/admin/staffs', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: '*/*',
                    },
                });
                setEmployees(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách nhân viên:', error);
                alert('Không thể lấy danh sách nhân viên.');
            }
        };
        fetchEmployees();
    }, []);

    return (
        <div className={cx('employeeList')}>
            <h1>Danh sách nhân viên</h1>
            <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        {/* <th>Hành động</th> */}
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.fullName}</td>
                                <td>{employee.email}</td>
                                {/* <td>
                                    <button
                                        onClick={() => {
                                            navigate('/addEditEmployee', {
                                                state: { handle: employee.id }, // Truyền ID nhân viên khi chỉnh sửa
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
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={cx('wrapperButton')}>
                <button
                    className={cx('addEmployeeButton')}
                    onClick={() => {
                        navigate('/addEditEmployee'); // Không truyền state, vì đây là thêm mới
                    }}
                >
                    Thêm nhân viên
                </button>
            </div>
        </div>
    );
}

export default AdminEmployee;
