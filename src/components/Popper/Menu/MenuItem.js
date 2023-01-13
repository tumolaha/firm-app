import PropTypes from 'prop-types';
//mui
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
const MenuItem = ({ data = [], onClick, ...passProps }) => {
    const theme = useTheme();
    const props = {
        onClick,
        ...passProps,
    };
    let Comp = 'div';
    if (data.to) {
        props.to = data.to;
        Comp = Link;
    }
    if (data.href) {
        props.href = data.href;
        Comp = 'a';
    }
    return (
        <Comp {...props}>
            <Stack
                direction={'row'}
                spacing={2}
                alignItems={'center'}
                sx={{
                    borderRadius: 5,
                    padding: '5px 10px',
                    '&:hover': {
                        background: theme.palette.grey[100],
                    },
                }}
            >
                <Box sx={{ background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {data.icon}
                </Box>
                <Typography variant="subtitle1">{data.title}</Typography>
            </Stack>
        </Comp>
    );
};
MenuItem.prototype = {
    data: PropTypes.array,
    onClick: PropTypes.any,
};
export default MenuItem;
