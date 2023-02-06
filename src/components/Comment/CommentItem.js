import PropTypes from 'prop-types';
import {useRef, useState } from 'react';

//mui
import { Avatar, Box, Typography, Stack, IconButton, Button, useTheme, Tooltip } from '@mui/material';
//icon
import { CaretDown, CaretUp, ThumbsDown, ThumbsUp } from 'phosphor-react';
//components
import { calculateTimePassed } from '~/util/utils';
import ReplyNewComment from './ReplyNewComment';
import ReplyComments from './ReplyComments';

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

function CommentItem({ data, reply = [] }) {
    const theme = useTheme();
    const likeRef = useRef(null);
    const unLikeRef = useRef(null);
    const [arrowUp, setArrowUp] = useState(false);
    const [showReplyComment, setShowReplyComment] = useState(false);

    const changeArrow = () => {
        setArrowUp((prev) => !prev);
    };

    let arrow = <CaretDown size={20} />;
    if (arrowUp) {
        arrow = <CaretUp size={20} />;
    }

    const likeComment = () => {};
    const unlikeComment = () => {
        return;
    };
    
    const handleShowReply = () => {
        setShowReplyComment((prev) => !prev);
    };
    return (
        <>
            <Stack direction={'row'} p={1} spacing={2} width="100%">
                <Box alignItems={'flex-start'} justifyItems={'center'}>
                    {data?.avatar ? (
                        <Avatar src={data?.user} sx={{ width: 40, height: 40 }} />
                    ) : (
                        <Avatar src={data?.user} sx={{ width: 40, height: 40 }} />
                    )}
                </Box>
                <Stack direction={'column'} spacing={0.5} width="100%">
                    <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2} width={'100%'}>
                        <Typography variant="h4">{data?.displayName}</Typography>
                        <Typography variant="subtitle1">{calculateTimePassed(data?.createAt)}</Typography>
                    </Stack>
                    <Stack direction={'row'} width={'100%'}>
                        <Typography variant="body1">{data?.body}</Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems="center" justifyContent="flex-start" spacing={5} width={'100%'}>
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
                                onClick={handleShowReply}
                            >
                                reply
                            </Button>
                        </Stack>
                    </Stack>
                    {showReplyComment && (
                        <ReplyNewComment autoFocus={false} callbackCancel={() => setShowReplyComment()} idComment={data?.id}/>
                    )}
                    {data?.replyNumber > 0 && (
                        <>
                            <Stack direction={'row'} width={'100%'}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        color: theme.palette.primary.main,
                                        cursor: 'pointer',
                                    }}
                                    onClick={changeArrow}
                                >
                                    {arrow}
                                    <Typography variant="overline" fontSize={'0.6rem'} fontWeight="600">
                                        show {data?.replyNumber} reply
                                    </Typography>
                                </Box>
                            </Stack>
                            {arrowUp && <ReplyComments id={reply} />}
                        </>
                    )}
                </Stack>
            </Stack>
        </>
    );
}

export default CommentItem;
CommentItem.prototype = {
    data: PropTypes.object,
    reply: PropTypes.array,
};
