import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useControlState from './useControlState'
import { authActions } from '../store/auth/auth-slice'
import { fetchCart } from '../store/cart/cart-actions'
import { fetchOrderHistory, fetchUserInfo } from '../store/dashboard/dashboard-actions'

const useInit = () => {
     const dispatch = useDispatch()

     const userId = useSelector(state => state.auth.userId)
     const cartItems = useSelector(state => state.cart.items)
     const userInfo = useSelector(state => state.dashboard.userInfo)
     const orderHistory = useSelector(state => state.dashboard.orderHistory)

     const { loading, error, fetchRequest } = useControlState()

     useEffect(() => {
          const uId = localStorage.getItem('n3xtify-userId')

          if(uId && !userId) {
               dispatch(authActions.login(uId))
          }
     }, [dispatch, userId])

     const { length: cartItemsLength } = cartItems

     useEffect(() => {
          if(!userId || cartItemsLength !== 0) return

          fetchRequest(fetchCart.bind(null, userId))
     }, [userId, cartItemsLength, fetchRequest])

     useEffect(() => {
          if(!userId || userInfo) return
          
          dispatch(fetchUserInfo(userId))
     }, [dispatch, userId])

     const { length: orderHistoryLength } = orderHistory

     useEffect(() => {
          if(!userId || orderHistoryLength !== 0) return

          dispatch(fetchOrderHistory(userId))
     }, [dispatch, userId, orderHistoryLength])

     return {
          loading,
          error
     }
}

export default useInit