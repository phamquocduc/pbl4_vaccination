import Header from '~/components/Layout/components/Header';
import classNames from 'classnames/bind';
import styles from './DashboadLayout.module.scss';

import Sidebar from './Sidebar';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function DashboardLayout({ children }) {
    useEffect(() => {
        document.body.style.background = '#fff';
        return () => {
            document.body.style.background = ''; // Khôi phục khi rời trang
        };
    }, []);
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
