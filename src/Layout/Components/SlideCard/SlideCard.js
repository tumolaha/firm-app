import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
//components
import Image from '~/components/Image/Image';
import { resizeImage } from '~/util/utils';
import { Star } from 'phosphor-react';
import { Link } from 'react-router-dom';
const SlideCard = ({ title, data = [] }) => {
    const theme = useTheme();
    const renderItem = () => {
        return data.map((element, index) => {
            return (
                <SwiperSlide key={index} style={{ height: '100%' }}>
                    <Link
                        to={
                            element.media_type === 'movie'
                                ? `/movie/${element.id}`
                                : element.media_type === 'tv'
                                ? `/tv/${element.id}`
                                : `/`
                        }
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        <Stack
                            direction={'column'}
                            justifyContent="flex-start"
                            p={1.5}
                            spacing={1}
                            width="180px"
                            sx={{
                                borderRadius: '10px',
                                '&:hover': {
                                    backgroundColor: theme.palette.grey[100],
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    height: '104px',
                                    width: '180px',
                                    overflow: 'hidden',
                                    borderRadius: '6px',
                                }}
                            >
                                <Image
                                    src={resizeImage(element?.backdrop_path, 'w1280')}
                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                    alt="background"
                                />
                                <Chip
                                    sx={{ position: 'absolute', top: 5, left: 5 }}
                                    size="small"
                                    label={element?.vote_average}
                                    color="primary"
                                    icon={<Star size={15} weight="fill" />}
                                />
                            </Box>

                            <Stack
                                direction={'column'}
                                alignItems="flex-start"
                                justifyContent={'flex-start'}
                                spacing={0.5}
                                width='100%'
                            >
                                <Typography variant="h5" fontSize={'0.9rem'} noWrap overflow={'hidden'} width='100%'>
                                    {element?.title}
                                </Typography>
                                <Stack
                                    direction={'row'}
                                    alignItems="100%"
                                    justifyContent={'flex-start'}
                                    flexWrap="nowrap "
                                    spacing={1}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.6rem',
                                            fontWeight: 400,
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        {element?.release_date}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 400,
                                            transform: 'translateY(-7px)',
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        .
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.6rem',
                                            fontWeight: 400,
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        {Math.floor(element?.popularity)} views{' '}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Link>
                </SwiperSlide>
            );
        });
    };
    return (
        <Stack direction={'column'} height="100%" width={'100%'}>
            <Stack direction={'row'} p={2}>
                <Typography variant="h4"> {title}</Typography>
            </Stack>
            <Swiper style={{ width: '100%' }} slidesPerView={6} spaceBetween={30}>
                {renderItem()}
            </Swiper>
        </Stack>
    );
};

export default SlideCard;
SlideCard.prototype = {
    title: PropTypes.string,
    data: PropTypes.array,
};
