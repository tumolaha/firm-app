import { useTheme } from '@emotion/react';
import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { PopperWrapper } from '~/components/Popper';
const SearchResultItem = ({ data }) => {
    const theme = useTheme();
    return (
        <div style={{margin: 0}}>
            <PopperWrapper>
                <Stack
                    direction={'column'}
                    padding="10px 0px"
                    sx={{ maxHeight: '500px', width: '300px', overflow: 'auto' }}
                >
                    {data?.map((item) => (
                        <Stack
                            key={item.id}
                            direction={'row'}
                            spacing={2}
                            padding="10px 10px"
                            alignItems={'center'}
                            justifyContent="start"
                            sx={{
                                borderRadius: '10px',
                                '&:hover': {
                                    backgroundColor: theme.palette.grey[100],
                                },
                            }}
                        >
                            <Box sx={{ height: '50px', width: '50px', overflow: 'hidden', borderRadius: '10px' }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                    alt="img"
                                />
                            </Box>
                            <Typography variant="subtitle1">{item.title} </Typography>
                        </Stack>
                    ))}
                </Stack>
            </PopperWrapper>
        </div>
    );
};
SearchResultItem.prototype = {
    value: PropTypes.array,
};
export default SearchResultItem;
