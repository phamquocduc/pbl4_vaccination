import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminEmployee.module.scss';

//import { EmployeeContext } from '~/Context/EmployeeContext';

const cx = classNames.bind(styles);

function AdminEmployee() {
    //const { employees } = useContext(EmployeeContext); // Lấy danh sách nhân viên từ Context
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([
        {
            fullName: 'Tran Quang K',
            email: 'k@gmail.com',
            passWord: '12345678',
            confirmPassWord: '12345678',
        },
    ]);

    return (
        <div className={cx('employeeList')}>
            <h1>Danh sách nhân viên</h1>
            <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.fullName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            navigate('/addEditEmployee', {
                                                state: { handle: employee.id },
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
                        navigate('/addEditEmployee');
                    }}
                >
                    Thêm nhân viên
                </button>
            </div>
        </div>
    );
}

export default AdminEmployee;
