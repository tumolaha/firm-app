import { Box, Button, Chip, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { BookmarksSimple, Play, Star } from 'phosphor-react';
import { Link } from 'react-router-dom';
import Image from '~/components/Image/Image';
import { resizeImage } from '~/util/utils';

const FilmBannerInfo = ({ data = [] }) => {
    const theme = useTheme();
    const renderItemGenres = () => {
        return (
            <Stack
                direction={'row'}
                alignItems="center"
                justifyContent={'start'}
                spacing={2}
                width="100%"
                overflow={'auto'}
                sx={{
                    padding: 0.5,
                    /* Firefox */
                    '* ': {
                        scrollbarWidth: 'auto',
                        scrollbarColor: '#c2bdbd #ffffff',
                    },
                    /* Chrome, Edge, and Safari */
                    '&::-webkit-scrollbar': {
                        height: '5px',
                    },

                    '&::-webkit-scrollbar-track': {},

                    ' &::-webkit-scrollbar-thumb': {
                        display: 'none',
                        background: theme.palette.grey[400],
                        borderRadius: '5px',
                        border: 'none ',
                        transform: '0.3s linear',
                    },
                    '&:hover': {
                        ' &::-webkit-scrollbar-thumb': {
                            display: 'flex',
                        },
                    },
                }}
            >
                {data?.detail?.genres?.map((item) => (
                    <Chip
                        key={item?.id}
                        label={item?.name}
                        variant="outlined"
                        sx={{ color: theme.palette.text.secondary, fontSize: '0.8rem' }}
                        component={Link}
                        to={'/'}
                    />
                ))}
            </Stack>
        );
    };
    return (
        <Grid container p={1} spacing={2} maxHeight="500px">
            <Grid item xs={4}  p={1} height="100%">
                <Stack direction={'column'} spacing={2} width="100%">
                    <Typography variant="h2" sx={{ color: theme.palette.text.primary }}>
                        {data?.detail?.title}
                    </Typography>
                    <Box display={'flex'} alignItems={'center'} justifyContent="start" padding={1} gap={1}>
                        <Chip
                            icon={<Star size={16} weight="fill" />}
                            size="small"
                            label={data?.detail?.vote_average}
                            color="primary"
                        />
                        <Divider
                            orientation="vertical"
                            sx={{ background: theme.palette.text.secondary, height: 20, width: 2 }}
                        />
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            {data?.detail?.release_date}
                        </Typography>
                        <Divider
                            orientation="vertical"
                            sx={{ background: theme.palette.text.secondary, height: 20, width: 2 }}
                        />
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            {data?.detail?.runtime} min
                        </Typography>
                    </Box>
                    {renderItemGenres()}
                    <Stack direction={'column'}>
                        <Typography variant="button">Director: </Typography>
                        <Typography variant="button">Cart: </Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2}>
                        <Link to={`/movie/${data?.detail?.id}/watch`}>
                            <Button
                                variant="contained"
                                startIcon={<Play size={24} weight="fill" />}
                                sx={{
                                    background: theme.palette.primary.dark,
                                    boxShadow: 'none',
                                    '&:hover': {
                                        background: theme.palette.primary.main,
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                Play
                            </Button>
                        </Link>
                        <Link to={'/'}>
                            <Button
                                variant="contained"
                                startIcon={<BookmarksSimple size={24} weight="fill" />}
                                sx={{
                                    background: theme.palette.grey[500],
                                    boxShadow: 'none',
                                    '&:hover': {
                                        background: theme.palette.grey.A400,
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                Watch Later
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={8} height="100%" alignItems={'center'} justifyContent="end">
                <Box sx={{ height: '400px', width: '100%' }} alignItems={'center'} justifyContent="flex-end">
                    <Image
                        src={resizeImage(data?.detail?.backdrop_path, 'w1280')}
                        alt="alt"
                        styles={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default FilmBannerInfo;
