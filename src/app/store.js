import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import commentReducer from './CommentSlice';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['comment'],
};


export default configureStore({
    reducer: {
        auth: authReducer,
        comment: commentReducer,
    },
});

const rootReducer = combineReducers({ auth: authReducer, comment: commentReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
