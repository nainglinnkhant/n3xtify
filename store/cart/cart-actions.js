import { createDate, sendRequest } from '../../utils/utils'
import { cartActions } from './cart-slice'
import { buyNowActions } from '../buy-now/buy-now-slice'
import { dashboardActions } from '../dashboard/dashboard-slice'

const FIREBASE_URL = process.env.NEXT_PUBLIC_FIREBASE_URL
const ERROR_MSG = 'Failed to connect to server.'

export const fetchCart = (userId) => {
    return async (dispatch) => {
        const url = `${FIREBASE_URL}/${userId}/cart.json`
        const responseData = await sendRequest(url, null, ERROR_MSG)

        if (!responseData) return

        const cartItems = []
        for (const key in responseData) {
            cartItems.push({ ...responseData[key], firebaseId: key })
        }

        dispatch(cartActions.setCartItems(cartItems))
    }
}

export const addToCart = (userId, product) => {
    return async (dispatch) => {
        const url = `${FIREBASE_URL}/${userId}/cart.json`
        const responseData = await sendRequest(
            url,
            {
                method: 'POST',
                body: JSON.stringify(product),
            },
            ERROR_MSG
        )

        dispatch(cartActions.addToCart({ ...product, firebaseId: responseData.name }))
    }
}

export const updateCart = (userId, firebaseId, product) => {
    return async (dispatch) => {
        const url = `${FIREBASE_URL}/${userId}/cart/${firebaseId}.json`

        const configObj =
            product.quantity === 0
                ? { method: 'DELETE' }
                : { method: 'PUT', body: JSON.stringify(product) }

        await sendRequest(url, configObj, ERROR_MSG)

        dispatch(cartActions.updateCart(product))
    }
}

export const emptyCart = (userId) => {
    return async (dispatch) => {
        await sendRequest(`${FIREBASE_URL}/${userId}/cart.json`, { method: 'DELETE' }, ERROR_MSG)

        dispatch(cartActions.emptyCart())
    }
}

export const checkout = ({ userId, orderId, total, details, type }) => {
    return async (dispatch) => {
        const order = {
            id: orderId,
            date: createDate(),
            total,
            details,
        }

        const requestArr = [
            sendRequest(
                `${FIREBASE_URL}/${userId}/order-history.json`,
                { method: 'POST', body: JSON.stringify(order) },
                ERROR_MSG
            ),
        ]

        if (type === 'cart') {
            requestArr.push(
                sendRequest(`${FIREBASE_URL}/${userId}/cart.json`, { method: 'DELETE' }, ERROR_MSG)
            )
        }

        await Promise.all(requestArr)

        type === 'cart' ? dispatch(cartActions.emptyCart()) : dispatch(buyNowActions.emptyBuyNow())
        dispatch(dashboardActions.addToOrderHistory(order))
    }
}
