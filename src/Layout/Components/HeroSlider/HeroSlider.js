import { Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { DotsThreeVertical } from 'phosphor-react';
import { PopperWrapper } from '~/components/Popper';
import HeroSliderItem from './HeroSliderItem';
import HeroSliderItemMain from './HeroSliderItemMain';
import { useEffect, useRef, useState } from 'react';

const HeroSlider = ({ data = [] }) => {
    const [currentSelected, setCurrentSelected] = useState(0);
    const theme = useTheme();
    const activeRef = useRef();
    const containerNavRef = useRef();
    const nextCurrentIndex = () => {
        if (currentSelected >= data.length - 1) {
            setCurrentSelected(0);
        } else {
            setCurrentSelected((prev) => prev + 1);
        }
        if(currentSelected === 0){
            setCurrentSelected((prev) => prev + 1);
        }
    };

    const handleClickNav = (index) => {
        if (currentSelected !== index) {
            setCurrentSelected(index);
        }
    };
    const renderItemNav = () => {
        return data.map((item, index) => {
            const checkActive = index === currentSelected;
            return checkActive ? (
                <HeroSliderItem
                    key={item.id}
                    item={item}
                    currentSelected={currentSelected}
                    index={index}
                    time={10}
                    ref={activeRef}
                    onClick={() => {
                        handleClickNav(index);
                    }}
                />
            ) : (
                <HeroSliderItem
                    key={item.id}
                    item={item}
                    currentSelected={currentSelected}
                    index={index}
                    time={10}
                    onClick={() => {
                        handleClickNav(index);
                    }}
                />
            );
        });
    };
    const renderItemMain = () => {
        return data.map((item, index) => {
            return <HeroSliderItemMain key={item.id} item={item} index={index} currentSelected={currentSelected} />;
        });
    };
    const scrollActiveControlImg = () => {
        const scrollDiv = activeRef.current?.offsetTop;

        setTimeout(() => {
            containerNavRef.current.scrollTo({ top: scrollDiv, behavior: 'smooth' });
        }, 300);
    };
    useEffect(() => {
        // if (currentSelected <= 0) {
        //     return;
        // }
        scrollActiveControlImg();
        const id = setTimeout(nextCurrentIndex, 10000);
        return () => clearTimeout(id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSelected]);


    return (
        <Grid container spacing={2} height="680px" width={'100%'}>
            <Grid
                item
                xs={8}
                height="100%"
                style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}
            >
                <div
                    style={{
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {renderItemMain()}
                </div>
            </Grid>
            {/* navigation */}
            <Grid
                item
                xs={4}
                height="100%"
                style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}
            >
                <PopperWrapper>
                    <Stack
                        direction={'column'}
                        padding="15px 20px"
                        spacing={2}
                        sx={{ position: 'relative', height: '100%', overflow: 'hidden' }}
                    >
                        <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                            <Typography variant="h5">Recomendation</Typography>
                            <IconButton size="small">
                                <DotsThreeVertical size={20} weight="fill" />
                            </IconButton>
                        </Stack>
                        <Stack
                            direction={'column'}
                            spacing={1.4}
                            sx={{
                                position: 'relative',
                                height: '100%',

                                /* Firefox */
                                '* ': {
                                    scrollbarWidth: 'auto',
                                    scrollbarColor: '#c2bdbd #ffffff',
                                },
                                /* Chrome, Edge, and Safari */
                                '&::-webkit-scrollbar': {
                                    width: '5px',
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
                            overflow={'auto'}
                            ref={containerNavRef}
                        >
                            {renderItemNav()}
                        </Stack>
                    </Stack>
                </PopperWrapper>
            </Grid>
        </Grid>
    );
};

export default HeroSlider;

HeroSlider.prototype = {
    data: PropTypes.array,
};
