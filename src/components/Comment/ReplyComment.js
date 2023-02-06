import PropTypes from 'prop-types';

import { Avatar, Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { calculateTimePassed } from '~/util/utils';
import { ThumbsDown, ThumbsUp } from 'phosphor-react';
import { useRef, useState } from 'react';
import ReplyNewComment from './ReplyNewComment';
function stringToColor(string = '') {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

stringToColor.prototype = {
    string: PropTypes.string,
};
// function stringAvatar(name) {
//     return {
//         sx: {
//             bgcolor: stringToColor(name),
//         },
//         children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//     };
// }
function ReplyComment({ data }) {
    const theme = useTheme();
    const likeRef = useRef(null);
    const unLikeRef = useRef(null);
    const [showReply, setShowReply] = useState(false);

    const likeComment = () => {};
    const unlikeComment = () => {
        return;
    };
    const handleClickReply = () => {
        setShowReply((prev) => !prev);
    };
    // {...stringAvatar(data?.username)}
    return (
        <Stack direction={'row'} p={2} spacing={2} width={'100%'}>
            <Box alignItems={'flex-start'} justifyItems={'center'}>
                {data?.avatar ? (
                    <Avatar src={data?.user} sx={{ width: 15, height: 15 }} />
                ) : (
                    <Avatar src={data?.user} sx={{ width: 15, height: 15 }} />
                )}
            </Box>

            <Stack direction={'column'} spacing={0.1} width="100%">
                <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
                    <Typography variant="h4" fontSize={'0.8rem'}>
                        {data?.displayName}
                    </Typography>
                    <Typography variant="subtitle1" fontSize={'0.8rem'}>
                        {calculateTimePassed(data?.createAt)}
                    </Typography>
                </Stack>
                <Stack direction={'row'}>
                    <Typography variant="body1">{data?.body}</Typography>
                </Stack>
                <Stack direction={'row'} alignItems="center" justifyContent="flex-start" spacing={5}>
                    <Stack direction={'row'} alignItems="center" spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px', gap: '5px' }}>
                            <Tooltip title="Like">
                                <IconButton size="small" onClick={likeComment}>
                                    <ThumbsUp size={24} ref={likeRef} />
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6">45</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px', gap: '5px' }}>
                            <Tooltip title="UnLike">
                                <IconButton size="small" onClick={unlikeComment}>
                                    <ThumbsDown size={24} ref={unLikeRef} />
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6">5</Typography>
                        </Box>
                    </Stack>
                    <Stack>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                borderRadius: '10px',
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    bgcolor: theme.palette.grey[200],
                                    boxShadow: 'none',
                                },
                            }}
                            onClick={handleClickReply}
                        >
                            reply
                        </Button>
                    </Stack>
                </Stack>
                {showReply && <ReplyNewComment callbackCancel={handleClickReply} idComment={data?.parentId}/>}
            </Stack>
        </Stack>
    );
}

export default ReplyComment;
