import { createSlice } from '@reduxjs/toolkit'
import { saveState } from './localStorage'

export const apiToken = createSlice({
    name: 'apiToken',
    initialState: {
        value: "",
    },
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload
            saveState(state.value)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setToken } = apiToken.actions

export default apiToken.reducer