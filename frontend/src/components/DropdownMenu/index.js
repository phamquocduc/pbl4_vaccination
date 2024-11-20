import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DropdownMenu.module.scss';

const cx = classNames.bind(styles);

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleSubMenu = (index) => setActiveSubMenu(activeSubMenu === index ? null : index);

    return (
        <div className={cx('menu-container')}>
            <button className={cx('menu-button')} onClick={toggleMenu}>
                Danh mục
            </button>
            {isOpen && (
                <div className={cx('dropdown-menu')}>
                    <div onClick={() => toggleSubMenu(1)} className={cx('menu-item')}>
                        Vắc xin cho trẻ em
                        {activeSubMenu === 1 && (
                            <div className={cx('submenu submenu-right')}>
                                <div className={cx('submenu-item')}>0-9 Tháng</div>
                                <div className={cx('submenu-item')}>0-12 Tháng</div>
                                <div className={cx('submenu-item')}>0-24 Tháng</div>
                            </div>
                        )}
                    </div>
                    <div className={cx('menu-item')}>Vắc xin cho trẻ tiền học đường</div>
                    <div className={cx('menu-item')}>Vắc xin cho tuổi vị thành niên và thanh niên</div>
                    <div className={cx('menu-item')}>Vắc xin cho người trưởng thành</div>
                    <div className={cx('menu-item')}>Vắc xin cho phụ nữ chuẩn bị trước mang thai</div>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
