import classNames from 'classnames/bind';
import styles from './SighUp.module.scss';
import { faCalculator, faEnvelope, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function SighUp() {
    return (
        <div className={cx('login-container')}>
            <div className={cx('left-section')}>
                <img src={images.logo273} alt="VaxReg Logo" className="logo" />
                <form className={cx('login-form')}>
                    <label htmlFor="fullname">Họ và Tên</label>
                    <input type="text" id="fullname" name="fullname" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" id="password" name="password" required />

                    <div className={cx('divider')}></div>
                    <button type="submit" className={cx('signup-button')}>
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
