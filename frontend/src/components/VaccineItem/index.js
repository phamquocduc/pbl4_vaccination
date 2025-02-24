import classNames from 'classnames/bind';
import styles from './VaccineItem.module.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function VaccineItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://png.pngtree.com/png-clipart/20190611/original/pngtree-vector-black-and-white-tiger-png-image_1984601.jpg"
                //src="https://th.bing.com/th/id/OIP.2HYTxjuEWmWgV1mMTNhI5gAAAA?pid=ImgDet&w=120&h=120&c=7&dpr=2&rs=1"
                alt="Khải"
            />
            <div className={cx('info')}>
                <h5 className={cx('name')}>
                    <span>Vắc xin tả (uống) mOrcvax - Việt Nam</span>
                    {/* <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} /> */}
                </h5>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default VaccineItem;
