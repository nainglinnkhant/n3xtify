import { sendRequest } from '../../utils/utils'
import { dashboardActions } from './dashboard-slice'

const FIREBASE_URL = process.env.NEXT_PUBLIC_FIREBASE_URL
const ERROR_MSG = 'Failed to connect to server.'

export const updateUserInfo = (userId, userInfo) => {
     return async (dispatch) => {
          await sendRequest(
               `${FIREBASE_URL}/${userId}/user-info.json`,
               { method: 'PUT', body: JSON.stringify(userInfo) },
               ERROR_MSG
          )

          dispatch(dashboardActions.setUserInfo(userInfo))
     }
}

export const fetchUserInfo = (userId) => {
     return async (dispatch) => {
          const url = `${FIREBASE_URL}/${userId}/user-info.json`
          const responseData = await sendRequest(url, null, ERROR_MSG)

          dispatch(dashboardActions.setUserInfo(responseData))
     }
}

export const fetchOrderHistory = (userId) => {
     return async (dispatch) => {
          const url = `${FIREBASE_URL}/${userId}/order-history.json`
          const responseData = await sendRequest(url, null, ERROR_MSG)
          
          if(!responseData) return

          const orderHistory = []
          for(const key in responseData) {
               orderHistory.push({ ...responseData[key] })
          }

          dispatch(dashboardActions.setOrderHistory(orderHistory))
     }
}