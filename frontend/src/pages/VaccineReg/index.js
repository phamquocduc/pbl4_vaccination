import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './VaccineReg.module.scss';
import VaccineItem from '~/components/VaccineItem';
import DropdownMenu from '~/components/DropdownMenu';
import VaccineApp from '~/components/Vaccine/VaccineApp';

const cx = classNames.bind(styles);

function VaccineReg() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 5);
    }, []);

    return (
        <body className={cx('wrapp')}>
            <div className={cx('inner')}>
                <div className={cx('top-content')}>
                    <div className={cx('information')}>
                        <div className="Dropdown-menu">
                            <DropdownMenu />
                        </div>
                        <h1>Thông tin sản phẩm</h1>
                    </div>
                    <Tippy
                        interactive
                        visible={searchResult.length > 0}
                        render={(attrs) => (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className={cx('search-title')}>Gói Khám</h4>
                                    <VaccineItem />
                                    <VaccineItem />
                                    <VaccineItem />
                                    <VaccineItem />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('search')}>
                            <div className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                            </div>
                            <input placeholder="Tìm kiếm..." spellCheck="false" />
                            <button className={cx('clear')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        </div>
                    </Tippy>
                </div>

                <div className={cx('slick-list')}>
                    <VaccineApp />
                </div>
            </div>
        </body>
    );
}

export default VaccineReg;
