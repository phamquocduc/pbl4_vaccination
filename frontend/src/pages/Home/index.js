import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import VaccineApp from '~/components/Vaccine/VaccineApp';
const cx = classNames.bind(styles);

function Home() {
    return (
        <body className={cx('wrapp')}>
            <div className={cx('inner')}></div>
        </body>
    );
}

export default Home;
