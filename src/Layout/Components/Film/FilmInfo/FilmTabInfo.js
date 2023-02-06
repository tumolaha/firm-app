import { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Rating, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
//components
import SlideCard from '../../SlideCard/SlideCard';
import { resizeImage } from '~/util/utils';
import Image from '~/components/Image/Image';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const TAB_ITEMS = [
    {
        title: 'Recommended',
    },
    {
        title: 'Cart',
    },
    {
        title: 'Review',
    },
];
function FilmTabInfo({ data = [] }) {
    const theme = useTheme();
    //tab current
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderTabItem = () => {
        return TAB_ITEMS.map((element, index) => {
            return <Tab key={index} label={element.title} {...a11yProps(index)} />;
        });
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="movie tabs info">
                    {renderTabItem()}
                </Tabs>
            </Box>
            {/* recommended */}
            <TabPanel value={value} index={0}>
                <Box width={'100%'} height="100%">
                    <SlideCard data={data?.recommendations} />
                </Box>
            </TabPanel>
            {/* review */}
            <TabPanel value={value} index={1}>
                <Box
                    width={'100%'}
                    height="100%"
                    display={'flex'}
                    alignItems="center"
                    flexWrap={'wrap'}
                    justifyContent="space-between"
                >
                    {data?.credits?.map((item) => {
                        return (
                            <Stack
                                key={item?.id}
                                direction={'column'}
                                p={2}
                                spacing={1}
                                borderRadius={1}
                                boxShadow={theme.shadows[0]}
                                sx={{ backgroundColor: theme.palette.background.paper }}
                            >
                                <Typography variant="h4">{item?.name}</Typography>
                                <Typography variant="body1">{item?.character}</Typography>
                                <Box height={'200px'} width={'150px'} borderRadius={1} overflow="hidden">
                                    <Image
                                        src={resizeImage(item?.profile_path)}
                                        alt=""
                                        styles={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                    ></Image>
                                </Box>
                            </Stack>
                        );
                    })}
                </Box>
            </TabPanel>
            {/* review */}
            <TabPanel value={value} index={2}>
                {!data?.reviews && data?.reviews?.length < 1 ? (
                    <Stack
                        direction={'column'}
                        width="100%"
                        alignItems={'center'}
                        justifyContent={'center'}
                        p={1}
                        spacing={1}
                    >
                        <Typography variant="h4">No review</Typography>
                    </Stack>
                ) : (
                    data?.reviews?.map((item) => (
                        <Stack key={item.id} direction={'column'} width="100%" p={1} spacing={1}>
                            <Stack
                                direction={'row'}
                                alignItems="start"
                                spacing={2}
                                sx={{ background: theme.palette.background.paper }}
                            >
                                <Stack direction={'column'} alignItems="start" justifyItems={'start'}>
                                    <Avatar
                                        src={resizeImage(data?.author_details?.avatar_path)}
                                        alt=""
                                        styles={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                    ></Avatar>
                                </Stack>
                                <Stack direction={'column'} width="100%" spacing={1} justifyContent="start">
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        width="100%"
                                    >
                                        <Typography variant="h4">{item?.author_details?.username}</Typography>
                                        <Typography variant="h5">{Date.parse(item?.created_at)}</Typography>
                                    </Stack>
                                    <Rating name="simple-rating-review" max={10} value={4.5} precision={0.5} readOnly />
                                    <Stack direction={'row'}>
                                        <Typography variant="body1" textAlign={'justify'} width="100%">
                                            {item?.content}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    ))
                )}
            </TabPanel>
        </Box>
    );
}

export default FilmTabInfo;
