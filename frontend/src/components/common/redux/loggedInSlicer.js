import { createSlice } from '@reduxjs/toolkit'

export const isLoggedIn = createSlice({
    name: 'isLoggedIn',
    initialState: {
        value: false,
    },
    reducers: {
        setTrue: (state) => {
            state.value = true
        },
        setFalse: (state) => {
            state.value = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { setTrue, setFalse } = isLoggedIn.actions

export default isLoggedIn.reducer