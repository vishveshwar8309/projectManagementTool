import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';
import projectSliceReducer from './slices/projectSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        projects: projectSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;