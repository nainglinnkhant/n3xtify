import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useControlState from '../../hooks/useControlState'
import { updateUserInfo } from '../../store/dashboard/dashboard-actions'
import { COUNTRY_LIST, validateEmail } from '../../utils/utils'
import Spinner from '../UI/Spinner'
import styles from '../../styles/Form.module.css'

const FIREBASE_URL = process.env.NEXT_PUBLIC_FIREBASE_URL

export default function UserInfoForm() {
     const userId = useSelector(state => state.auth.userId)

     const [email, setEmail] = useState('')
     const [firstname, setFirstname] = useState('')
     const [lastname, setLastname] = useState('')
     const [address, setAddress] = useState('')
     const [city, setCity] = useState('')
     const [country, setCountry] = useState(1)
     const [postalCode, setPostalCode] = useState('')
     const [phoneNumber, setPhoneNumber] = useState('')
     const [formError, setFormError] = useState(null)

     const isFormValid = validateEmail(email)

     const { loading, error: requestError, setError: setRequestError, fetchRequest } = useControlState()

     useEffect(async () => {
          if(!userId) return

          const response = await fetch(`${FIREBASE_URL}/${userId}/user-info.json`)
          const { 
               email, 
               firstname, 
               lastname, 
               address, 
               city, 
               country, 
               postalCode, 
               phoneNumber 
          } = await response.json()

          setEmail(email || '')
          setFirstname(firstname || '')
          setLastname(lastname || '')
          setAddress(address || '')
          setCity(city || '')
          setCountry(country || 1)
          setPostalCode(postalCode || '')
          setPhoneNumber(phoneNumber || '')
     }, [userId])

     const handleSubmit = (e) => {
          e.preventDefault()
          setFormError(null)
          setRequestError(null)

          if(!isFormValid) return setFormError('Something\'s wrong with your information.')
     
          const userInfo = {
               email,
               firstname,
               lastname,
               address,
               city,
               country,
               postalCode,
               phoneNumber
          }

          fetchRequest(updateUserInfo.bind(null, userId, userInfo))
     }

     return (
          <form className={styles.form} onSubmit={handleSubmit}>
               <div className='mt-3'>
                    <label htmlFor='email'>Email</label>
                    <input 
                         type='email' 
                         id='email' 
                         className='form-control' 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                    />
               </div>

               <div className='mt-3 row gx-2'>
                    <div className='col-6'>
                         <label htmlFor='firstname'>First name</label>
                         <input 
                              type='text' 
                              id='firstname' 
                              className='form-control' 
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                         />
                    </div>

                    <div className='col-6'>
                         <label htmlFor='lastname'>Last name</label>
                         <input 
                              type='text' 
                              id='lastname' 
                              className='form-control' 
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                         />
                    </div>
               </div>

               <div className='mt-3'>
                    <label htmlFor='address'>Address</label>
                    <textarea 
                         type='text' 
                         id='address' 
                         className='form-control' 
                         value={address}
                         onChange={(e) => setAddress(e.target.value)}
                    />
               </div>

               <div className='mt-3'>
                    <label htmlFor='city'>City</label>
                    <input 
                         type='text' 
                         id='city' 
                         className='form-control' 
                         value={city}
                         onChange={(e) => setCity(e.target.value)}
                    />
               </div>

               <div className='mt-3 row gx-2'>
                    <div className='col-6'>
                         <label htmlFor='country'>Country</label>
                         <select 
                              type='text' 
                              id='country' 
                              className='form-select'
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                         >
                              {COUNTRY_LIST.map((country, index) => (
                                   <option key={country} value={index}>
                                        {country}
                                   </option>
                              ))}
                         </select>
                    </div>

                    <div className='col-6'>
                         <label htmlFor='postal-code'>Postal code</label>
                         <input 
                              type='text' 
                              id='postal-code' 
                              className='form-control'
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)} 
                         />
                    </div>
               </div>

               <div className='mt-3'>
                    <label htmlFor='phone-number'>Phone number</label>
                    <input 
                         type='text' 
                         id='phone-number' 
                         className='form-control' 
                         value={phoneNumber}
                         onChange={(e) => setPhoneNumber(e.target.value)}
                    />
               </div>

               <button className='btn' style={{ width: '8rem', padding: '.375rem .75rem', letterSpacing: '2px' }}>
                    {loading ? <Spinner /> : 'UPDATE'}
               </button>

               {formError && <p className={`mb-0 mt-3 ${styles.error}`}>{formError}</p>}
               {requestError && <p className={`mb-0 mt-3 ${styles.error}`}>{requestError}</p>}
          </form>
     )
}
