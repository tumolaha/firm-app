import { Avatar, Button, ClickAwayListener, Popper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Alarm, Bookmarks, SignOut, User } from 'phosphor-react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


//components
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Transitions from '~/ui-components/Extended/Transitions';
const MENU_ITEM = [
    {
        icon: <User size={24} />,
        title: 'My Account',
        to: '/account',
    },
    {
        icon: <Bookmarks size={24} />,
        title: 'What Later',
        to: '/what-later',
    },
    {
        icon: <Alarm size={24} />,
        title: 'Reservation',
        to: '/Reservation',
    },
    {
        icon: <SignOut size={24} />,
        title: 'Logout',
        to: '/logout',
    },
    
];
const AccountHeader = () => {
    const {currentUser} =  useSelector(state=>state.auth)
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setAnchorEl(null);
    };
    const anchorRef = useRef(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    
    return (
        <div>
            {
                currentUser ?(
                    <>
                    <Stack direction={'row'} spacing={2} onClick={handleClick}>
                        <Avatar src={images.logo} variant="circular" />
                        <Stack direction={'column'} justifyContent={'start'}>
                            <Typography variant="h5">Nguyen Van Tu</Typography>
                            <Typography variant="body2" color={theme.palette.grey[500]}>
                            Product designer
                            </Typography>
                        </Stack>
                    </Stack>
                    <Popper
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        placement={matchesXs ? 'bottom' : 'bottom-end'}
                        role={undefined}
                        transition
                        disablePortal
                        popperOptions={{
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [matchesXs ? 5 : 0, 20],
                                    },
                                },
                            ],
                        }}
                    >
                        {({ TransitionProps }) => (
                            <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                                <ClickAwayListener onClickAway={handleClose}>
                                        <Menu items={MENU_ITEM} />
                                </ClickAwayListener>
                            </Transitions>
                        )}
                    </Popper>
                    </>
                ):(
                    <Link to={'/login'}>
                        <Button variant="contained" > Sign in</Button>
                    </Link>
                    
                )   
            }
            
        </div>
    );
};

export default AccountHeader;
