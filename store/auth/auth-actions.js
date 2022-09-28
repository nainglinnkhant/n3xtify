import { sendRequest } from '../../utils/utils'
import { authActions } from './auth-slice'
import { dashboardActions } from '../dashboard/dashboard-slice'

const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const FIREBASE_URL = process.env.NEXT_PUBLIC_FIREBASE_URL

export const login = ({ email, password }) => {
    return async (dispatch) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

        const { localId } = await sendRequest(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            },
            'Your email or password is incorrect!'
        )

        dispatch(authActions.login(localId))
    }
}

export const signup = ({ email, password, firstname, lastname }) => {
    return async (dispatch) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

        const { localId } = await sendRequest(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            },
            'Your email is already used!'
        )

        await sendRequest(`${FIREBASE_URL}/${localId}/user-info.json`, {
            method: 'PUT',
            body: JSON.stringify({ email, firstname, lastname }),
        })

        dispatch(authActions.login(localId))
        dispatch(dashboardActions.setUserInfo({ email, firstname, lastname }))
    }
}
