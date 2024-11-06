import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import VaccineItem from '~/components/VaccineItem';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('group-logo')}>
                    <img src={images.logo} alt="VaxReg" />
                    <div className={cx('hotline')}>
                        <div className={cx('logo-hotline')}>
                            <FontAwesomeIcon icon={faPhoneVolume} style={{ color: '#ee5d65' }} size="2x" />
                        </div>
                        <div className="title-support">
                            <h5>"Hotline hỗ trợ đặt lịch"</h5>
                            <h4>1900 1234</h4>
                        </div>
                    </div>
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
                        {/* Loading */}
                    </div>
                </Tippy>
                <div className={cx('actions')}>
                    <Button>
                        <img
                            alt="Vn"
                            src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FVN.bda9ffec.svg&w=64&q=75"
                        ></img>
                        <img src={images.logoVn} alt="" />
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
