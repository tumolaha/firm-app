import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import CommentItem from './CommentItem';
import { useDispatch, useSelector } from 'react-redux';
import { getFirstComment } from '~/app/CommentSlice';
import { useParams } from 'react-router-dom';
//

function ScrollComment(props) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, loading } = useSelector((state) => state.comment);

    // const [messages, setMessages] = useState(data);
    // const [showBottomBar, setShowBottomBar] = useState(true);

    useEffect(() => {
        if (id) {
            // const originalPromiseResult = await dispatch(getFirstComment({ mediaId: props.mediaId })).unwrap();
            // setMessages([...originalPromiseResult]);
            dispatch(getFirstComment({ mediaId: id }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //lazy load
    const observer = useRef(
        new IntersectionObserver(async (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                try {
                    const originalPromiseResult = await dispatch(getFirstComment()).unwrap();
                    if (originalPromiseResult.length > 0) {
                        // setMessages([...originalPromiseResult]);
                    } else {
                        setTimeout(() => {
                            // setShowBottomBar(false);
                        }, 3000);
                    }
                    // handle result here
                } catch (rejectedValueOrSerializedError) {
                    // handle error here
                    console.log(rejectedValueOrSerializedError);
                }
            }
        }),
        { threshold: 1 },
    );

    const [bottomBar, setBottomBar] = useState(null);

    useEffect(() => {
        const currentBottomBar = bottomBar;
        const currentObserver = observer.current;
        if (currentBottomBar) {
            currentObserver.observe(currentBottomBar);
        }
        return () => {
            if (currentBottomBar) {
                currentObserver.unobserve(currentBottomBar);
            }
        };
    }, [bottomBar]);

    const renderComment = () => (
        <Stack direction={'column'} spacing={0.5} width="100%">
            {data.length > 0 ? (
                data.map((item) => {
                    return <CommentItem key={item.id} data={item} reply={item.id} />;
                })
            ) : (
                <Stack direction={'row'} alignItems="center" justifyContent={'center'} p={5}>
                    <Typography variant="h4">No Comments</Typography>
                </Stack>
            )}
        </Stack>
    );

    return (
        <>
            {renderComment()}
            {data.length > 9 && loading ? (
                <Box sx={{ display: 'flex', justifyContent: ' center', width: '100%' }} ref={setBottomBar}>
                    <CircularProgress size={20} />
                </Box>
            ) : null}
        </>
    );
}

export default ScrollComment;
