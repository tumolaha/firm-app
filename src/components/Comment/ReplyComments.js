import PropTypes from 'prop-types';
//mui
import { CircularProgress, Stack } from '@mui/material';
//firebase
import { collection, query, where } from 'firebase/firestore';
// import { useEffect } from 'react';
import { db } from '~/firebase';
//components
import useFireStoreQuery from '~/hook/useFireStoreQuery';
import ReplyComment from './ReplyComment';

function ReplyComments({ id }) {
    const q = query(collection(db, 'comments'), where('parentId', '==', `${id}`));

    const { data, error, status } = useFireStoreQuery(q);
    const renderItemReplyComment = (arrReply) => {
        return arrReply.map((item) => <ReplyComment key={item.id} data={item} />);
    };
    return (
        <Stack direction={'column'} width="100%" justifyContent={'center'}>
            {status === 'success' && renderItemReplyComment(data)}
            {status === 'loading' && <CircularProgress size={20} />}
        </Stack>
    );
}

export default ReplyComments;
ReplyComments.prototype = {
    id: PropTypes.string,
};
