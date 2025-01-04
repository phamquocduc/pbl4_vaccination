import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './AddEditEmployee.module.scss';

const cx = classNames.bind(styles);

function AddEditEmployee() {
    const navigate = useNavigate();
    const location = useLocation();
    const employeeId = location.state?.handle || null; // Lấy ID nhân viên từ state (nếu có)

    const [employee, setEmployee] = useState({
        fullName: '',
        email: '',
        passWord: '',
        confirmPassWord: '',
        role: 'staff', // Giá trị mặc định là "staff"
    });

    const [isEditMode, setIsEditMode] = useState(false);

    // Nếu có ID nhân viên, chuyển sang chế độ "Chỉnh sửa"
    useEffect(() => {
        if (employeeId) {
            setIsEditMode(true);
            fetchEmployeeDetails(employeeId); // Lấy thông tin nhân viên từ API
        }
    }, [employeeId]);

    // Hàm lấy chi tiết nhân viên
    const fetchEmployeeDetails = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`http://localhost:3000/admin/staffs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*',
                },
            });
            setEmployee({
                ...response.data,
                passWord: '',
                confirmPassWord: '',
            }); // Cập nhật dữ liệu vào form
        } catch (error) {
            console.error('Lỗi khi lấy thông tin nhân viên:', error);
            alert('Không thể lấy thông tin nhân viên.');
        }
    };

    // Hàm xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value,
        });
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu và xác nhận mật khẩu khớp
        if (employee.passWord !== employee.confirmPassWord) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                Accept: '*/*',
            };

            if (isEditMode) {
                // Chế độ chỉnh sửa: Gửi API cập nhật
                await axios.put(`http://localhost:3000/admin/staffs/${employeeId}`, employee, {
                    headers,
                });
                alert('Cập nhật nhân viên thành công!');
            } else {
                // Chế độ thêm mới: Gửi API tạo mới
                await axios.post('http://localhost:3000/admin/create/staff', employee, {
                    headers,
                });
                alert('Thêm nhân viên mới thành công!');
            }

            navigate('/adminEmployee'); // Quay lại trang danh sách nhân viên
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            alert('Không thể gửi dữ liệu.');
        }
    };

    return (
        <div className={cx('container-AddEditEmployee')}>
            <h1>{isEditMode ? 'Cập nhật Nhân Viên' : 'Thêm Nhân Viên Mới'}</h1>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label>Họ và tên:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={employee.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Email:</label>
                    <input type="email" name="email" value={employee.email} onChange={handleInputChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="passWord"
                        value={employee.passWord}
                        onChange={handleInputChange}
                        required
                        minLength="8"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        name="confirmPassWord"
                        value={employee.confirmPassWord}
                        onChange={handleInputChange}
                        required
                        minLength="8"
                    />
                </div>
                {/* <div className={cx('form-group')}>
                    <label>Vai trò:</label>
                    <select name="role" value={employee.role} onChange={handleInputChange} required>
                        <option value="staff">Nhân viên</option>
                        <option value="admin">Quản trị viên</option>
                    </select>
                </div> */}
                <button type="submit" className={cx('submit-button')}>
                    {isEditMode ? 'Cập nhật' : 'Thêm Nhân Viên'}
                </button>
            </form>
        </div>
    );
}

export default AddEditEmployee;
