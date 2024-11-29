import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SighUp.module.scss';
import { faArrowRight, faCalculator, faEnvelope, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import { ReactComponent as GoogleLoGo } from '~/assets/images/google.svg';
import axios from 'axios';

const cx = classNames.bind(styles);

function SighUp() {
    const navigate = useNavigate();

    // lưu giá trị email và password
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setrepeatPassword] = useState('');

    //Xử lý đăng kí
    const handleSighUp = async (e) => {
        // kiểm tra thông tin
        if (!name) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        if (!(password === repeatPassword)) {
            alert('Mật khẩu không giống nhau !');
            return;
        }

        //Tạo mới đăng nhập
        // Lấy thông tin name, email, password rồi lưu tạo trong database
        // try {
        //     const response = await axios.post('http://localhost:3000/auth/login', { email, password });
        //     if (response.status === 201) {
        //         alert('Đăng nhập thành công!');
        //         navigate('/vaccinereg');
        //     }
        // } catch (error) {
        //     if (error.response && error.response.status === 401) {
        //         alert('Thông tin đăng nhập không chính xác!');
        //     } else {
        //         console.error('Lỗi đăng nhập:', error);
        //         alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        //     }
        // }

        // về đăng nhập lại
        alert('Tạo thành công');
        navigate('/');
    };

    return (
        <div className={cx('login-container')}>
            <div className={cx('left-section')}>
                <img src={images.logo273} alt="VaxReg Logo" className="logo" />
                <form className={cx('login-form')}>
                    <h2>Tạo tài khoản mới</h2>
                    <label htmlFor="fullname">Họ và Tên</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    <label htmlFor="">Nhắc lại mật khẩu</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        name="repeatPassword"
                        required
                        value={repeatPassword}
                        onChange={(e) => setrepeatPassword(e.target.value)}
                    />

                    <div className={cx('divider')}></div>
                    <button type="submit" className={cx('signup-button')} onClick={handleSighUp}>
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
export default SighUp;
