import { useRef, useState } from 'react';

import { Avatar, Box, Button, IconButton, Stack, useTheme } from '@mui/material';
import TippyHeadless from '@tippyjs/react/headless';
import Picker from '@emoji-mart/react';
import dataEmoji from '@emoji-mart/data';

import { CloudFog, PaperPlaneTilt, Smiley, X } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import { replyNewComment } from '~/app/CommentSlice';
function ReplyNewComment(props) {
    const { currentUser, typeLogin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // const [commentLine, setCommentLine] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [enableBtn, setEnableBtn] = useState(true);
    const messageRef = useRef();

    const theme = useTheme();
    const commentFocusOut = () => {
        // setCommentLine(false);
    };
    const commentStroke = (event) => {
        let currMessage = event.target.value;
        if (currMessage) {
            setEnableBtn(false);
        } else {
            setEnableBtn(true);
        }
    };
    const handleEmojiClick = (event) => {
        let message = valueInput;
        message += event.native;
        setValueInput(message);
    };
    const sendComment = (event) => {
        event.preventDefault();
        const dataComment = {
            displayName: currentUser?.user?.displayName,
            userAvatar: currentUser?.user?.photoURL,
            body: valueInput,
            likeNumber: 0,
            unlikeNumber: 0,
            parentId: `${props.idComment}`,
            replyNumber: 0,
            userId: currentUser?.user?.uid,
            createAt: Date.now(),
        };
        if (valueInput.length > 0) {
            console.log(dataComment);
            dispatch(replyNewComment(dataComment));
            setValueInput('');
        }
    };
    return (
        <>
            <Box padding={1} width={'100%'}>
                <Stack
                    direction={'row'}
                    alignItems="flex-start"
                    justifyContent={'space-between'}
                    spacing={2}
                    width={'100%'}
                >
                    <Stack direction={'row'}>
                        <Avatar src={currentUser?.user?.photoURL} sx={{ width: 25, height: 25 }} />
                    </Stack>
                    <Stack direction={'column'} width="100%" alignItems={'center'} spacing={1}>
                        <input
                            placeholder="new comment"
                            // autoFocus={this.props.autoFocus}
                            typeof="text"
                            autoFocus={props.autoFocus}
                            style={{
                                width: '100%',
                                minHeight: 40,
                                border: 'none',
                                outline: 'none',
                                padding: '10px 20px',
                                background: theme.palette.grey[100],
                                borderRadius: 2,
                            }}
                            value={valueInput}
                            onChange={(e) => setValueInput(e.target.value)}
                            onBlur={commentFocusOut}
                            onKeyUp={commentStroke}
                            ref={messageRef}
                        />
                        <Stack
                            direction={'row'}
                            spacing={2}
                            alignItems="center"
                            justifyContent={'space-between'}
                            height={'100%'}
                            width="100%"
                        >
                            <TippyHeadless
                                interactive
                                trigger="click"
                                placement="top-end"
                                render={(attrs) => (
                                    <div className="box" {...attrs} tabIndex="-1">
                                        <Picker data={dataEmoji} onEmojiSelect={handleEmojiClick} />
                                    </div>
                                )}
                            >
                                <IconButton id="emoji-icon-button">
                                    <Smiley size={24} />
                                </IconButton>
                            </TippyHeadless>
                            <Stack direction={'row'} spacing={2} alignItems="center" justifyContent={'space-between'}>
                                <Button
                                    id="send-icon-button"
                                    startIcon={<PaperPlaneTilt size={24} />}
                                    onClick={sendComment}
                                    disabled={enableBtn}
                                    variant="contained"
                                    sx={{ boxShadow: 'none' }}
                                    size="small"
                                >
                                    Send
                                </Button>
                                <Button
                                    id="cancel-icon-button"
                                    startIcon={<X size={24} />}
                                    onClick={() => props.callbackCancel()}
                                    variant="text"
                                    size="small"
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}

export default ReplyNewComment;
