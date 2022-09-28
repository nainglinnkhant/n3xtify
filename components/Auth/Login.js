import { useRouter } from 'next/router'
import useInput from '../../hooks/useInput'
import useControlState from '../../hooks/useControlState'
import { login } from '../../store/auth/auth-actions'
import { validateEmail } from '../../utils/utils'
import Input from '../UI/Input'
import Spinner from '../UI/Spinner'
import styles from '../../styles/Auth.module.css'

export default function Login() {
    const router = useRouter()

    const {
        input: email,
        isInputValid: isEmailValid,
        isInputInvalid: isEmailInvalid,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
    } = useInput(validateEmail)

    const {
        input: password,
        isInputValid: isPasswordValid,
        isInputInvalid: isPasswordInvalid,
        handleInputChange: handlePaswordChange,
        handleInputBlur: handlePasswordBlur,
    } = useInput((input) => input.trim().length > 5)

    const emailClasses = `mt-2 mt-sm-3 ${isEmailInvalid ? styles.invalid : ''}`
    const passwordClasses = `mt-2 mt-sm-3 ${isPasswordInvalid ? styles.invalid : ''}`

    const isFormValid = isEmailValid && isPasswordValid

    const { loading, error, fetchRequest } = useControlState()

    const handleSubmit = (e) => {
        e.preventDefault()

        fetchRequest(login.bind(null, { email, password })).then((res) => {
            if (res) router.back()
        })
    }

    return (
        <>
            <h2>Login into your account</h2>

            <form onSubmit={handleSubmit}>
                <div className={emailClasses}>
                    <Input
                        label='Email'
                        type='email'
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        isInvalid={isEmailInvalid}
                        errorMsg='Please enter a valid email.'
                    />
                </div>

                <div className={passwordClasses}>
                    <Input
                        label='Password'
                        type='password'
                        id='password'
                        value={password}
                        onChange={handlePaswordChange}
                        onBlur={handlePasswordBlur}
                        isInvalid={isPasswordInvalid}
                        errorMsg='Password should have at least six characters.'
                    />
                </div>

                <button className='btn' disabled={!isFormValid}>
                    {loading ? <Spinner /> : 'LOGIN'}
                </button>

                {error && <p className={styles.error}>{error}</p>}
            </form>
        </>
    )
}
