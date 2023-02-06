//components

import NewComment from './NewComment';
import ScrollComment from './ScrollComment';

function Comment(props) {
    return (
        <>
            <NewComment autoFocus={false} mediaId={props.mediaId} />
            <ScrollComment mediaType={props.mediaType} mediaId={props.mediaId}></ScrollComment>
        </>
    );
}

export default Comment;
