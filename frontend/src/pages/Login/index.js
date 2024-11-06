import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import images from '~/assets/images';
import { UserContext } from '~/Context/UserContext';

const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();

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

        // Kiểm tra thông tin đăng nhập (giả sử email là 'admin@example.com' và password là 'password123')
        if (email === 'khaitran955@gmail.com' && password === '123') {
            alert('Đăng nhập thành công!');
            // ni là điều hướng trang thâu à
            navigate('/');
        } else {
            alert('Thông tin đăng nhập không chính xác!');
        }

        // //Ni chưa có backend nên t để đại đó chờ hehe
        // try {
        //     const response = await axios.post('http://localhost:1501/api/login', { email, password });
        //     if (response.status === 200) {
        //         alert('Đăng nhập thành công!');
        //         navigate('/');
        //     }
        // } catch (error) {
        //     if (error.response && error.response.status === 401) {
        //         alert('Thông tin đăng nhập không chính xác!');
        //     } else {
        //         console.error('Lỗi đăng nhập:', error);
        //         alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        //     }
        // }
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
                    <button type="button" className={cx('signup-button')} onClick={handleSighUp}>
                        Tạo tài khoản mới
                    </button>
                </form>
            </div>
            <div className={cx('right-section')}>
                <div class={cx('style_shape__1HA08')}></div>
                <img
                    src="https://scontent.fdad3-6.fna.fbcdn.net/v/t1.15752-9/462541754_578249121307043_8859130459058318689_n.png?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE4o3aTPzrAUWWQyORRkl1-nel8FZyVe2Gd6XwVnJV7YS_OF8e5kaN4aBZYKHvyxnwkRxORbnqPN-IwoDJmt03P&_nc_ohc=jREv5JKYP3YQ7kNvgEVw_Vc&_nc_zt=23&_nc_ht=scontent.fdad3-6.fna&_nc_gid=Acep8v1snCgF9WWOQlOeQgb&oh=03_Q7cD1QHlsJR7mfNY_6avvDGJDELiHiXGXf79vHM-DadC7hUN4w&oe=674A5E70"
                    alt="Doctor"
                    className={cx('doctor-image')}
                />
            </div>
        </div>
    );
}
export default Login;
