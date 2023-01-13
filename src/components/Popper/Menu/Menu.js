import { Button, Typography, Stack, IconButton } from '@mui/material';
import classNames from 'classnames/bind';
import { CaretLeft } from 'phosphor-react';
import PropTypes from 'prop-types';

import { forwardRef, useState } from 'react';
import { PopperWrapper } from '..';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);
const MenuHeader = ({ title, onBack }) => {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ position: 'relative', width: '100%', height: 'auto', padding: '10px 10px' }}
        >
            <IconButton className={cx('back-btn')} onClick={onBack} sx={{ position: 'absolute', left: '0px', '&:hover':{
                background: 'none'
            } }} size={'small'}>
                <CaretLeft size={24} />
            </IconButton>
            <Typography variant="h5">{title}</Typography>
        </Stack>
    );
};
const defaultFn = () => {};

const Menu = forwardRef(({items=[], hideOnClick = false, onChange = defaultFn}, ref) => {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    // Reset to first page
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };
    return (
        <div className={cx('menu-list')} ref={ref}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <MenuHeader title={current.title} onBack={handleBack} />}
                <Stack className={cx('menu-body')} p={1}>{renderItems()}</Stack>
            </PopperWrapper>
        </div>
    );
});
Menu.propTypes = {
    value: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};
export default Menu;
