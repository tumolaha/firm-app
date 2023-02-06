import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { auth, googleAuthProvider, facebookAuthProvider } from '~/firebase';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const signUpPassWord = createAsyncThunk('auth/signUpPassWord', async (params, thunkAPI) => {
    const { email, password } = params;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { user };
});
export const signInPassWord = createAsyncThunk('auth/signInPassWord', async (params, thunkAPI) => {
    const { email, password } = params;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { user };
});

export const signInGoogle = createAsyncThunk('auth/signInGoogle', async (params, thunkAPI) => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    const token = credential.accessToken;
    const user = userCredential.user;
    return { user, token };
});
export const signInFacebook = createAsyncThunk('auth/signInFacebook', async (params, thunkAPI) => {
    const userCredential = await signInWithPopup(auth, facebookAuthProvider);
    const credential = FacebookAuthProvider.credentialFromResult(userCredential);
    const token = credential.accessToken;
    const user = userCredential.user;
    return { user, token };
});
export const logout = createAsyncThunk('auth/logout', async (params, thunkAPI) => {
    await signOut(auth);
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        loading: false,
        error: '',
        typeLogin: null,
    },
    reducers: {},
    extraReducers: {
        [signInPassWord.pending]: (state) => {
            state.loading = true;
        },
        [signInPassWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [signInPassWord.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'password';
        },
        [signUpPassWord.pending]: (state) => {
            state.loading = true;
        },
        [signUpPassWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [signUpPassWord.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'password';
        },
        [signInGoogle.pending]: (state) => {
            state.loading = true;
        },
        [signInGoogle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [signInGoogle.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'google';
        },
        [signInFacebook.pending]: (state) => {
            state.loading = true;
        },
        [signInFacebook.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [signInFacebook.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.typeLogin = 'facebook';
        },
        [logout.pending]: (state) => {
            state.loading = true;
        },
        [logout.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [logout.fulfilled]: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.typeLogin = null;
        },
    },
});

export default authSlice.reducer;
