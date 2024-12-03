import Header from '~/components/Layout/components/Header';
import classNames from 'classnames/bind';
import styles from './DashboadLayout.module.scss';

import Sidebar from './Sidebar';
const cx = classNames.bind(styles);

function DashboardLayout({ children }) {
    return (
        <div className={cx('wrapper-DashboardLayout')}>
            <Header />
            <div className={cx('container-dashboard')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DashboardLayout;
