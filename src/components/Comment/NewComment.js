import { Avatar, Box, Button, IconButton, Stack, useTheme } from '@mui/material';
import TippyHeadless from '@tippyjs/react/headless';
import Picker from '@emoji-mart/react';
import dataEmoji from '@emoji-mart/data';

import { PaperPlaneTilt, Smiley, X } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { addNewComment } from '~/app/CommentSlice';

function NewComment(props) {
    const dispatch = useDispatch();
    const { currentUser, typeLogin } = useSelector((state) => state.auth);

    const [showNavigate, setShowNavigate] = useState(false);
    // console.log(currentUser);
    // const [commentLine, setCommentLine] = useState(false);
    const [enableBtn, setEnableBtn] = useState(true);

    const [valueInput, setValueInput] = useState('');

    const messageRef = useRef();

    const theme = useTheme();
    const commentFocusIn = () => {
        // setCommentLine(true);
        setShowNavigate(true);
    };
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
            parentId: '',
            replyNumber: 0,
            userId: currentUser?.user?.uid,
            mediaId: props?.mediaId,
            createAt: Date.now(),
        };
        if (valueInput.length > 0) {
            // handleSendChatValue(valueFormChat);
            dispatch(addNewComment(dataComment));
            setValueInput('');
        }
    };

    return (
        <>
            <Box padding={1}>
                <Stack direction={'row'} alignItems="flex-start" justifyContent={'space-between'} spacing={2}>
                    <Stack direction={'row'}>
                        <Avatar src={currentUser?.user?.photoURL} />
                    </Stack>
                    <Stack direction={'column'} width="100%" alignItems={'center'} spacing={2}>
                        <input
                            placeholder="new comment"
                            typeof="text"
                            autoFocus={props.autoFocus}
                            style={{
                                width: '100%',
                                minHeight: 30,
                                border: 'none',
                                outline: 'none',
                                padding: '10px',
                                background: theme.palette.grey[100],
                                borderRadius: 2,
                            }}
                            value={valueInput}
                            onChange={(e) => setValueInput(e.target.value)}
                            onFocus={commentFocusIn}
                            onBlur={commentFocusOut}
                            onKeyUp={commentStroke}
                            ref={messageRef}
                        />
                        {showNavigate && (
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
                                            <Picker data={dataEmoji} onEmojiSelect={handleEmojiClick} theme="light" />
                                        </div>
                                    )}
                                >
                                    <IconButton id="emoji-icon-button">
                                        <Smiley size={24} />
                                    </IconButton>
                                </TippyHeadless>
                                <Stack
                                    direction={'row'}
                                    spacing={2}
                                    alignItems="center"
                                    justifyContent={'space-between'}
                                >
                                    <Button
                                        id="send-icon-button"
                                        startIcon={<PaperPlaneTilt size={24} />}
                                        onClick={sendComment}
                                        disabled={enableBtn}
                                        variant="contained"
                                        sx={{ boxShadow: 'none' }}
                                    >
                                        Send
                                    </Button>
                                    <Button
                                        id="cancel-icon-button"
                                        startIcon={<X size={24} />}
                                        onClick={() => setShowNavigate(false)}
                                        variant="text"
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}

export default NewComment;
