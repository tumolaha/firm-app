import PropTypes from 'prop-types';
import { Box, Stack, Typography, useTheme, styled } from '@mui/material';
import { keyframes } from '@emotion/react';

//component
import Image from '~/components/Image/Image';
import { resizeImage } from '~/util/utils';
import { forwardRef } from 'react';

const HeroSliderItem = forwardRef(({ item, onClick, currentSelected, index, time, refActive }, ref) => {
    const theme = useTheme();
    const checkActive = index === currentSelected;

    return (
        <Box
            onClick={onClick}
            ref={ref}
            sx={{
                position: 'relative',
                background: checkActive ? theme.palette.grey[200] : '',
                padding: '10px 10px',
                borderRadius: 2,
                '&:hover': {
                    background: theme.palette.grey[200],
                },
                cursor: 'pointer',
            }}
        >
            <Stack direction={'row'} spacing={2} alignItems={'center'} height="100%" zIndex={1} position="relative">
                <Box
                    sx={{
                        width: '112px',
                        height: '68px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        src={resizeImage(item?.backdrop_path, 'w1280')}
                        style={{ height: '100%', width: '100%', objectFit: 'cover', zIndex: 0 }}
                        alt="backgound"
                    />
                </Box>
                <Stack direction={'column'} spacing={0.2}>
                    <Typography variant="h5" fontSize={'0.9rem'}>
                        {item?.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '0.7rem', fontWeight: 400 }}>
                        {item?.release_date}
                    </Typography>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        color={theme.palette.text.disabled}
                        flexWrap={'nowrap'}
                        spacing={1}
                    >
                        <Typography sx={{ fontSize: '0.6rem', fontWeight: 400 }}>44:12</Typography>
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                fontWeight: 400,
                                transform: 'translateY(-5px)',
                            }}
                        >
                            .
                        </Typography>
                        <Typography sx={{ fontSize: '0.6rem', fontWeight: 400 }}>
                            {Math.floor(item?.popularity)} views
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            {checkActive && (
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        background: theme.palette.grey[300],
                        borderRadius: 2,
                        opacity: 0.8,
                        width: '0%',
                        '@keyframes pulsate': {
                            from: {
                                width: '0%',
                                background: theme.palette.grey[300],
                            },
                            to: {
                                width: '100%',
                                background: theme.palette.grey[300],
                            },
                        },
                        animation: 'pulsate 10000ms infinite linear',
                    }}
                ></Box>
            )}
        </Box>
    );
});

export default HeroSliderItem;

HeroSliderItem.prototype = {
    item: PropTypes.object,
    onClick: PropTypes.func,
    currentSelected: PropTypes.number,
    index: PropTypes.number,
    time: PropTypes.number,
};
