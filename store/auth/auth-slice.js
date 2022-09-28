import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { userId: null },
    reducers: {
        login(state, action) {
            state.userId = action.payload
            localStorage.setItem('n3xtify-userId', action.payload)
        },
        logout(state) {
            state.userId = null
            localStorage.removeItem('n3xtify-userId')
        },
    },
})

export const authActions = authSlice.actions
export default authSlice.reducer
