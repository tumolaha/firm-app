import { Box, Button, Chip, Stack, Typography, useTheme } from '@mui/material';
import { Bookmarks, ChatTeardropDots, Eye, Play, Star } from 'phosphor-react';
import Image from '~/components/Image/Image';
import { PopperWrapper } from '~/components/Popper';
import PropTypes from 'prop-types';
import { resizeImage } from '~/util/utils';
function HeroSliderItemMain({ item, currentSelected, index }) {
    const theme = useTheme();
    const checkHidden = index === currentSelected;
    return (
        <div
            style={{
                position: 'absolute',
                opacity: checkHidden ? '1' : '0',
                zIndex: checkHidden ? 1 : -1,
                transition: '1s linear',
                height: '100%',
            }}
        >
            <PopperWrapper>
                <Stack
                    direction={'column'}
                    paddingBottom="10px"
                    bgcolor={theme.palette.background.paper}
                    overflow="hidden"
                    spacing={2}
                >
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        width="100%"
                        maxHeight={'500px'}
                        overflow="hidden"
                        sx={{
                            position: 'relative',
                        }}
                    >
                        <Image
                            style={{ height: '100%', width: '100%', objectFit: 'cover', zIndex: 0 }}
                            src={resizeImage(item?.backdrop_path, 'w1280')}
                            alt="backgound"
                        ></Image>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                background:
                                    'linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.0001) 100%)',
                                zIndex: 10,
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <Stack direction={'column'} heigh="100%" width="100%" position="relative" p={2} spacing={2}>
                                <Stack
                                    direction="row"
                                    alignItems={'center'}
                                    justifyContent="space-between"
                                    width="100%"
                                >
                                    <div></div>
                                    <Chip
                                        color="info"
                                        icon={<Star size={20} weight="fill" />}
                                        label={item.vote_average}
                                    />
                                </Stack>
                                <Stack direction={'row'}>
                                    <Stack direction={'column'} spacing={2} width="50%" marginLeft={'20px'}>
                                        <Typography
                                            variant="h2"
                                            sx={{ color: theme.palette.primary.main, fontSize: '3rem' }}
                                        >
                                            {item.title}{' '}
                                        </Typography>
                                        <Stack direction={'column'}>
                                            <Typography
                                                variant="h3"
                                                sx={{ color: theme.palette.common.white, fontSize: '2rem' }}
                                            >
                                                {item.original_title}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}
                                            >
                                                Release date: {item.release_date}
                                            </Typography>
                                        </Stack>
                                        <Stack direction={'row'} spacing={1}>
                                            <Chip
                                                label="comedy"
                                                variant="outlined"
                                                sx={{ color: theme.palette.text.secondary }}
                                            />
                                            <Chip
                                                label="action"
                                                variant="outlined"
                                                sx={{ color: theme.palette.text.secondary }}
                                            />
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack direction={'column'} padding="0px 15px" spacing={2} height="100%">
                        <Stack direction={'row'} alignItems={'center'} height="100%">
                            <Stack direction={'column'} spacing={1} width="100%" justifyContent={'center'}>
                                <Typography variant="h5">{item.original_title}</Typography>
                                <Stack direction={'row'} spacing={2} width="100%">
                                    <Box
                                        sx={{
                                            color: theme.palette.text.disabled,
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'nowrap',
                                        }}
                                    >
                                        <Eye size={10} weight="fill" />
                                        <Typography variant="inherit" marginLeft={'5px'}>
                                            {item.popularity}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            color: theme.palette.text.disabled,
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'nowrap',
                                        }}
                                    >
                                        <ChatTeardropDots size={10} weight="fill" />
                                        <Typography variant="inherit" marginLeft={'5px'}>
                                            11 302
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <Button
                                    variant="outlined"
                                    startIcon={<Play size={20} weight="light" />}
                                    size="small"
                                    sx={{
                                        border: '1px solid',
                                        borderRadius: '20px',
                                        borderColor: theme.palette.text.disabled,
                                        fontSize: '0.8rem',
                                        fontWeight: '400',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Watch a Movie
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Bookmarks size={20} weight="light" />}
                                    size="small"
                                    sx={{
                                        border: '1px solid',
                                        borderRadius: '20px',
                                        borderColor: theme.palette.text.disabled,
                                        fontSize: '0.8rem',
                                        fontWeight: '400',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Add Bookmark
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'column'}>
                                <Image
                                    src={resizeImage(item.poster_path)}
                                    alt=""
                                    style={{
                                        height: '60px',
                                        width: '40px',
                                        overflow: 'hidden',
                                        borderRadius: '5px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Stack>
                            <Stack direction={'column'} spacing={1}>
                                <Typography variant="h5">Mary Cooper</Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: '0.7rem', fontWeight: 400, transition: '1.2s linear' }}
                                >
                                    {item.overview}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </PopperWrapper>
        </div>
    );
}

export default HeroSliderItemMain;

HeroSliderItemMain.prototype = {
    item: PropTypes.object,
    currentSelected: PropTypes.number,
};
