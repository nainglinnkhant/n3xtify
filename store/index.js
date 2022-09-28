import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './products/products-slice'
import authSlice from './auth/auth-slice'
import cartSlice from './cart/cart-slice'
import buyNowSlice from './buy-now/buy-now-slice'
import dashboardSlice from './dashboard/dashboard-slice'

const store = configureStore({
    reducer: {
        products: productsSlice,
        auth: authSlice,
        cart: cartSlice,
        buyNow: buyNowSlice,
        dashboard: dashboardSlice,
    },
})

export default store
