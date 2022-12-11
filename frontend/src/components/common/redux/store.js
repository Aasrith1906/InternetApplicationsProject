import { configureStore } from '@reduxjs/toolkit'
import { isLoggedIn } from './loggedInSlicer';
import { apiToken } from './apiTokenSlicer';
import { userInfo } from './userInfoSlicer';

var store = configureStore({
    reducer: {
        isLoggedIn: isLoggedIn.reducer,
        apiToken: apiToken.reducer,
        userInfo: userInfo.reducer
    },
});

export { store }
