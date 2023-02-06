import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '~/layout/Components/Header';
import Sidebar from './Sidebar';
import { useTheme } from '@mui/material';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const theme =  useTheme();
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')} style={{background: theme.palette.background.default}}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
