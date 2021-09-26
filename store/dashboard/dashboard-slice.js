import { createSlice } from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
     name: 'dashboard',
     initialState: { userInfo: null, orderHistory: [] },
     reducers: {
          setUserInfo(state, action) {
               state.userInfo = action.payload
          },
          setOrderHistory(state, action) {
               state.orderHistory = action.payload
          },
          addToOrderHistory(state, action) {
               state.orderHistory.push(action.payload)
          },
          clearDashBoard(state) {
               state.userInfo = null,
               state.orderHistory = []
          }
     }
})

export const dashboardActions = dashboardSlice.actions
export default dashboardSlice.reducer