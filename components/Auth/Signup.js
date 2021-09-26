import { useRouter } from 'next/router'
import useInput from '../../hooks/useInput'
import useControlState from '../../hooks/useControlState'
import { signup } from '../../store/auth/auth-actions'
import { validateEmail } from '../../utils/utils'
import Input from '../UI/Input'
import Spinner from '../UI/Spinner'
import styles from '../../styles/Auth.module.css'

export default function Signup() {
     const router = useRouter()

     const { 
          input: email, 
          isInputValid: isEmailValid,
          isInputInvalid: isEmailInvalid,
          handleInputChange: handleEmailChange,
          handleInputBlur: handleEmailBlur
     } = useInput(validateEmail)

     const { 
          input: firstname, 
          isInputValid: isFirstnameValid,
          isInputInvalid: isFirstnameInvalid,
          handleInputChange: handleFirstnameChange, 
          handleInputBlur: handleFirstnameBlur
     } = useInput((input) => input.trim().length > 1)

     const { 
          input: lastname, 
          isInputValid: isLastnameValid,
          isInputInvalid: isLastnameInvalid,
          handleInputChange: handleLastnameChange, 
          handleInputBlur: handleLastnameBlur
     } = useInput((input) => input.trim().length > 1)

     const {
          input: password,
          isInputValid: isPasswordValid,
          isInputInvalid: isPasswordInvalid,
          handleInputChange: handlePaswordChange,
          handleInputBlur: handlePasswordBlur
     } = useInput((input) => input.trim().length > 5)

     const {
          input: confirmPassword,
          isInputValid: isConfirmPasswordValid,
          isInputInvalid: isConfirmPasswordInvalid,
          handleInputChange: handleConfirmPasswordChange,
          handleInputBlur: handleConfirmPasswordBlur
     } = useInput(input => input.trim() === password)

     const emailClasses = `mt-2 mt-sm-3 ${isEmailInvalid ? styles.invalid : ''}`
     const firstnameClasses = `${isFirstnameInvalid ? styles.invalid : ''}`
     const lastnameClasses = `${isLastnameInvalid ? styles.invalid : ''}`
     const passwordClasses = `mt-2 mt-sm-3 ${isPasswordInvalid ? styles.invalid : ''}`
     const confirmPasswordClasses = `mt-2 mt-sm-3 ${isConfirmPasswordInvalid ? styles.invalid : ''}`

     const isFormValid = isEmailValid && isFirstnameValid && isLastnameValid && isPasswordValid && isConfirmPasswordValid

     const { loading, error, fetchRequest } = useControlState() 

     const handleSubmit = (e) => {
          e.preventDefault()

          fetchRequest(signup.bind(null, { email, password, firstname, lastname }))
          .then((res) => {
               if(res) router.back()
          })
     }

     return (
          <>
               <h2>Sign up for an account</h2>

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

                    <div className='mt-2 mt-sm-3 row gx-2'>
                         <div className='col-6'>
                              <div className={firstnameClasses}>
                                   <Input
                                        label='First name'
                                        type='text'
                                        id='firstname'
                                        value={firstname}
                                        onChange={handleFirstnameChange}
                                        onBlur={handleFirstnameBlur}
                                        isInvalid={isFirstnameInvalid}
                                        errorMsg='First name should have at least two characters.'
                                   />
                              </div>
                         </div>

                         <div className='col-6'>
                              <div className={lastnameClasses}>
                                   <Input
                                        label='Last name'
                                        type='text'
                                        id='lastname'
                                        value={lastname}
                                        onChange={handleLastnameChange}
                                        onBlur={handleLastnameBlur}
                                        isInvalid={isLastnameInvalid}
                                        errorMsg='Last name should have at least two characters.'
                                   />
                              </div>
                         </div>
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

                    <div className={confirmPasswordClasses}>
                         <Input
                              label='Confirm password'
                              type='password'
                              id='confirm-password'
                              value={confirmPassword}
                              onChange={handleConfirmPasswordChange}
                              onBlur={handleConfirmPasswordBlur}
                              isInvalid={isConfirmPasswordInvalid}
                              errorMsg="Passwords don't match."
                         />
                    </div>

                    <button className='btn' disabled={!isFormValid}>
                         {loading ? <Spinner /> : 'SIGN UP'}
                    </button>

                    {error && <p className={styles.error}>{error}</p>}
               </form>
          </>
     )
}
