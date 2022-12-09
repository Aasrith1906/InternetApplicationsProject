import { configureStore } from '@reduxjs/toolkit'
import { isLoggedIn } from './loggedInSlicer';
import { apiToken } from './apiTokenSlicer'

var store = configureStore({
    reducer: {
        isLoggedIn: isLoggedIn.reducer,
        apiToken: apiToken.reducer,
    },
});

export { store }
