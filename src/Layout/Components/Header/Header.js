import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Stack, Typography, useTheme } from '@mui/material';

import images from '~/assets/images/index';
import SearchHeader from './SearchHeader/SearchHeader';
import AccountHeader from './Account/Account';
import SettingHeader from './SettingHeader/SettingHeader';
import NotificationHeader from './NotificationHeader/NotificationHeader';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Header() {
    const theme = useTheme();
    const { currentUser } = useSelector((state) => state.auth);
    return (
        <header className={cx('wrapper')}>
            {/* <div className={cx('inner')}></div>  */}
            <Stack
                direction={'row'}
                spacing={2}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{ width: '100%', margin: '10px', zIndex: 99999 }}
            >
                <Stack direction={'row'} alignContent={'start'} spacing={2} alignItems={'center'}>
                    <div className={cx('logo')}>
                        <img src={images.logo} alt="logo"></img>
                    </div>
                    <SearchHeader />
                </Stack>
                <Stack direction={'row'} alignContent={'center'} alignItems={'center'} spacing={2}>
                    <Typography
                        variant="h4"
                        sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}
                    >
                        Overview
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}
                    >
                        Subscriptions
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}
                    >
                        Streams
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}
                    >
                        Library
                    </Typography>
                </Stack>
                <Stack direction={'row'} alignContent={'end'} alignItems={'center'} spacing={2}>
                    <SettingHeader />
                    {currentUser && <NotificationHeader />}
                    <AccountHeader />
                </Stack>
            </Stack>
        </header>
    );
}

export default Header;
