import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobSlice from "./jobSlice";
import jobReducer from "./jobSlice"
import { createRoot } from 'react-dom/client';
import companySlice from "./companySlice";
import companyReducer from "./companySlice";
import storage from 'redux-persist/lib/storage';
import { version } from "react";


import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import applicationSlice from "./applicationSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    job: jobSlice,
    jobs: jobReducer,
    company: companySlice,
    company: companyReducer,
    application: applicationSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store;