import { Box, Stack, Typography, useTheme } from '@mui/material';
import classNames from 'classnames/bind';
import { Layout } from 'phosphor-react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const theme = useTheme();
    return (
        <div className={cx('wrapper')}>
            <Stack
                direction={'column'}
                spacing={1}
                sx={{
                    background: theme.palette.background.paper,
                    width: '100%',
                    height: '100%',
                    padding: '20px 10px',
                    color: theme.palette.text.secondary,
                    boxShadow:
                        '20px 0px 80px rgb(199 217 244 / 7%), 20px 0px 33.4221px rgb(199 217 244 / 5%), 20px 0px 17.869px rgb(199 217 244 / 4%), 20px 0px 10.0172px rgb(199 217 244 / 4%), 7px -1px 5.32008px rgb(199 217 244 / 3%), 4px 0px 2.21381px rgb(199 217 244 / 2%)',
                }}
            >
                <Stack
                    direction={'row'}
                    alignItems="center"
                    justifyContent={'start'}
                    p={1}
                    spacing={2}
                    borderRadius="10px"
                    sx={{
                        '&:hover': {
                            background: theme.palette.grey[100],
                        },
                    }}
                    component={Link}
                    to="/home"
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Layout size={24} weight="fill" />
                    </Box>
                    <Typography variant="subtitle1" color={theme.palette.text.primary} fontWeight={500}>
                        Dashboard
                    </Typography>
                </Stack>
            </Stack>
        </div>
    );
}

export default Sidebar;
