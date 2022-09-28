import { createSlice } from '@reduxjs/toolkit'

const buyNowSlice = createSlice({
    name: 'buy-now',
    initialState: { item: [] },
    reducers: {
        setBuyNowItem(state, action) {
            state.item = action.payload
        },
        emptyBuyNow(state) {
            state.item = []
        },
    },
})

export const buyNowActions = buyNowSlice.actions
export default buyNowSlice.reducer
