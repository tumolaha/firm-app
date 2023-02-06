import { Box, Chip, Divider, Grid, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import { CloudFog, Star } from 'phosphor-react';
import Comment from '~/components/Comment';
import { embedMovie, embedTV } from '~/util/utils';
import SlideCard from '../../SlideCard/SlideCard';

const FilmWatch = ({ data, detailSeasons, media_type, seasonId, episodeId }) => {
    const theme = useTheme();
    // console.log('object');
    return (
        <Grid container direction={'column'} spacing={1} width='100%'>
            <Grid container width={'100%'}>
                <Grid item xs={8} height={550}>
                    <Stack direction={'column'} width="100%" height="100%" spacing={2} p={2}>
                        <Stack direction={'row'} position="relative" width="100%" height="100%">
                            {data ? (
                                <Skeleton variant="rectangular" width={'100%'} height={'100%'}></Skeleton>
                            ) : (
                                // <iframe
                                //     style={{ width: '100%', height: '100%' }}
                                //     src={
                                //         media_type === 'movie'
                                //             ? embedMovie(data?.detail?.id)
                                //             : embedTV(data?.detail?.id, seasonId, episodeId)
                                //     }
                                //     title="Film Video Player"
                                //     frameBorder="0"
                                //     allowFullScreen
                                // ></iframe>
                                <></>
                            )}
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            <Grid width={'100%'}>
                <Stack direction={'column'} spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Typography variant="h3">{data?.detail?.title}</Typography>

                        {media_type === 'tv' && <Typography variant="h3">{data?.detail?.title}</Typography>}
                    </Box>
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
                        {media_type === 'movie' && (
                            <Typography variant="body1" color={theme.palette.text.secondary}>
                                {data?.detail?.runtime} min
                            </Typography>
                        )}
                        {media_type === 'tv' && (
                            <Typography variant="body1" color={theme.palette.text.secondary}>
                                {data?.detail?.section} min
                            </Typography>
                        )}
                    </Box>

                    <Stack direction={'row'}>
                        <Stack direction={'column'} spacing={2}>
                            <Stack direction={'row'} spacing={1}>
                                {data?.detail?.genres.map((item) => (
                                    <Chip
                                        key={item?.id}
                                        label={item?.name}
                                        variant="outlined"
                                        sx={{ color: theme.palette.text.secondary }}
                                    />
                                ))}
                                <Chip label="action" variant="outlined" sx={{ color: theme.palette.text.secondary }} />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Typography variant='body1'>{data?.detail?.overview}</Typography>
                    <Stack direction={'row'} width='100%'>
                        <SlideCard title='recommendations' data={data?.recommendations}/>
                    </Stack>
                    <Stack>
                        <Comment mediaType='' mediaId={data?.detail?.id}/>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default FilmWatch;
