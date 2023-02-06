import {
    addDoc,
    collection,
    doc,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { CloudFog } from 'phosphor-react';
import { db } from '~/firebase';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const getDoc = (res) => {
    return res.docs.map((doc) => {
        return doc.exists && { id: doc.id, ...doc.data() };
    });
};
export const getFirstComment = createAsyncThunk('comment/getFirstComment', async (params, thunkAPI) => {
    const q = query(
        collection(db, 'comments'),
        where('mediaId', '==', `${params.mediaId}`),
        where('parentId', '==', ''),
        orderBy('createAt', 'desc'),
        limit(10),
    );
    const querySnapshot = await getDocs(q);
    return getDoc(querySnapshot);
});
export const getSkipComment = createAsyncThunk('comment/getSkipComment', async (params, thinAPI) => {
    const q = query(collection(db, 'comments'), where('parentId', '==', ''), orderBy('createAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    return getDoc(querySnapshot);
});

export const addNewComment = createAsyncThunk('comment/addNewComment', async (data, thunkAPI) => {
    // const newCityRef = doc(collection(db, 'comments'));
    // await setDoc(newCityRef, data);
    const docRef = await addDoc(collection(db, 'comments'), data);
    const dataResult = { id: docRef?.id, ...data };
    return dataResult;
});
export const replyNewComment = createAsyncThunk('comment/replyNewComment', async (data, thunkAPI) => {
    // const newCityRef = doc(collection(db, 'comments'));
    // await setDoc(newCityRef, data);
    console.log(data);
    await addDoc(collection(db, 'comments'), data);

    await updateDoc(doc(db, 'comments', data?.parentId), {
        replyNumber: increment(1),
    });

    return data?.parentId;
});
export const CommentSlice = createSlice({
    name: 'comment',
    initialState: {
        loading: false,
        error: '',
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getFirstComment.pending, (state, action) => {
            state.loading = true;
            // state.error = action.error;
        });
        builder.addCase(getFirstComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getFirstComment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload;
        });
        builder.addCase(getSkipComment.pending, (state, action) => {
            state.loading = true;
            state.error = action.error;
        });
        builder.addCase(getSkipComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getSkipComment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = [...state.data, ...action.payload];
        });
        builder.addCase(addNewComment.pending, (state, action) => {
            state.loading = true;
            // state.error = action.error;
        });
        builder.addCase(addNewComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(addNewComment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = [action.payload, ...state.data];
        });
        builder.addCase(replyNewComment.pending, (state, action) => {
            state.loading = true;
            // state.error = action.error;
        });
        builder.addCase(replyNewComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(replyNewComment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';

            const arrTmp = [...state.data];
            const index = arrTmp.findIndex((obj) => obj.id === action.payload);
            arrTmp[index].replyNumber += 1;
            state.data = JSON.parse(JSON.stringify(arrTmp));
            // state.data[index].replyNumber++;
        });
    },
});

export default CommentSlice.reducer;
