import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
        setCartItems(state, action) {
            state.items = action.payload
        },
        addToCart(state, action) {
            state.items.push(action.payload)
        },
        updateCart(state, action) {
            const index = state.items.findIndex((item) => item.id === action.payload.id)
            if (action.payload.quantity === 0) {
                state.items.splice(index, 1)
            } else {
                state.items[index].quantity = action.payload.quantity
            }
        },
        emptyCart(state) {
            state.items = []
        },
    },
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer
