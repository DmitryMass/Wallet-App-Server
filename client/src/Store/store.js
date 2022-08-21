import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authSlice from './Features/authSlice';
import { cardsApi } from './Slice/apiSlice';
import { cashApi } from './Slice/cashSlice';
import { checkerApi } from './Slice/checkerSliceApi';
import {
  loginApi,
  logoutApi,
  registrationApi,
} from './Slice/Login-Register/login-register-slice';

const store = configureStore({
  reducer: {
    userToken: authSlice,
    [cardsApi.reducerPath]: cardsApi.reducer,
    [checkerApi.reducerPath]: checkerApi.reducer,
    [cashApi.reducerPath]: cashApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [logoutApi.reducerPath]: logoutApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cardsApi.middleware,
      checkerApi.middleware,
      cashApi.middleware,
      registrationApi.middleware,
      loginApi.middleware,
      logoutApi.middleware
    ),
});

setupListeners(store.dispatch);
// setuplistener в целом не нужен
// нужен для Рефетча при фокусе или конекте, на будущее )

export default store;
