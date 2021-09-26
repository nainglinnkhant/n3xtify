import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
     name: 'products',
     initialState: { filter: 'all' },
     reducers: {
          setFilter(state, action) {
               state.filter = action.payload
          }
     }
})

export const productActions = productsSlice.actions
export default productsSlice.reducer