import { IconButton, Tooltip, Popper, Box, useMediaQuery, useTheme, ClickAwayListener } from '@mui/material';
import { current } from '@reduxjs/toolkit';
import { Gear, GlobeHemisphereEast, Keyboard, Question } from 'phosphor-react';
import { Children, useRef, useState } from 'react';
import Menu from '~/components/Popper/Menu';
import Transitions from '~/ui-components/Extended/Transitions';

const MENU_ITEM = [
    {
        icon: <GlobeHemisphereEast size={24} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <Question size={24} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <Keyboard size={24} />,
        title: 'Keyboard shortcuts',
    },
];
const SettingHeader = () => {
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
    
    //theme
    return (
        <div>
            <Tooltip title="setting">
                <IconButton aria-label="setting" size="small" onClick={handleClick}>
                    <Gear size={24} />
                </IconButton>
            </Tooltip>
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
        </div>
    );
};

export default SettingHeader;
