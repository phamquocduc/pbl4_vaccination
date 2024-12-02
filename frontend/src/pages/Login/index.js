import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import images from '~/assets/images';
import LogoBG from '~/assets/images/loginBG.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { UserContext } from '~/Context/UserContext';

const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const { user, login } = useContext(UserContext);

    // lưu giá trị email và password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Xử lý đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault();
        // Kiểm tra nếu email hoặc password bị trống không
        if (!email || !password) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        // // Kiểm tra thông tin đăng nhập (giả sử email là 'admin@example.com' và password là 'password123')
        // if (email === 'khaitran955@gmail.com' && password === '123') {
        //     alert('Đăng nhập thành công!');
        //     login({ email: 'khaitran955@gmail.com', password: '123' });
        //     // ni là điều hướng trang thâu à
        //     navigate('/vaccinereg');
        // } else {
        //     alert('Thông tin đăng nhập không chính xác!');
        // }

        //Ni chưa có backend nên t để đại đó chờ hehe
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
            if (response.status === 201) {
                const { access_token } = response.data; // Lấy token từ phản hồi API
                localStorage.setItem('authToken', access_token); // Lưu token vào localStorage
                alert('Đăng nhập thành công!');
                navigate('/recordList');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Thông tin đăng nhập không chính xác!');
            } else {
                console.error('Lỗi đăng nhập:', error);
                alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        }
    };

    const handleSighUp = () => {
        // logic đăng kí
        navigate('/sighup');
    };
    return (
        <div className={cx('login-container')}>
            <div className={cx('left-section')}>
                <img src={images.logo273} alt="VaxReg Logo" className="logo" />
                <form className={cx('login-form')} onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className={cx('login-button')}>
                        Tiếp tục
                    </button>

                    <a href="#" className={cx('forgot-password')}>
                        Quên mật khẩu
                    </a>
                    <div className={cx('divider')}></div>

                    <button type="button" className={cx('gg-btn')}>
                        <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '5px' }} />
                        <span>Tiếp tục với Google</span>
                    </button>

                    <button type="button" className={cx('signup-button')} onClick={handleSighUp}>
                        Tạo tài khoản mới
                    </button>
                </form>
            </div>
            <div className={cx('right-section')}>
                <div class={cx('style_shape__1HA08')}></div>
                <img src={LogoBG} alt="Doctor" className={cx('doctor-image')}></img>
            </div>
        </div>
    );
}
export default Login;
