import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { COUNTRY_LIST, validateForm } from '../../utils/utils'
import styles from '../../styles/Form.module.css'

export default function CheckoutForm({ onStepChange, setShipping, minShippingCost, fillForm }) {
     const cachedInfo = JSON.parse(localStorage.getItem('n3xtify-checkout-info'))
     const userInfo = useSelector(state => state.dashboard.userInfo)
     const formData = fillForm ? cachedInfo || userInfo : cachedInfo

     const [email, setEmail] = useState(formData?.email || '')
     const [firstname, setFirstname] = useState(formData?.firstname || '')
     const [lastname, setLastname] = useState(formData?.lastname || '')
     const [address, setAddress] = useState(formData?.address || '')
     const [city, setCity] = useState(formData?.city || '')
     const [country, setCountry] = useState(formData?.country || '1')
     const [postalCode, setPostalCode] = useState(formData?.postalCode || '')
     const [phoneNumber, setPhoneNumber] = useState(formData?.phoneNumber || '')
     const [error, setError] = useState(null)

     const isFormValid = validateForm({ email, firstname, lastname, address, city, postalCode, phoneNumber })

     const calculateShipping =  useCallback((country) => {
          return country.length > 1 
               ? Number(country[0]) + Number(country[1]) + minShippingCost 
               : Number(country[0]) + minShippingCost
     }, [minShippingCost])

     useEffect(() => {
          let shipping = calculateShipping(country)

          setShipping(shipping)
     }, [country, calculateShipping])

     const handleSubmit = (e) => {
          e.preventDefault()

          if(!isFormValid) return setError('Something\'s wrong with your information.')

          onStepChange(2)

          const checkoutInfo = {
               email,
               firstname,
               lastname,
               address,
               city,
               country,
               postalCode,
               phoneNumber
          }
          localStorage.setItem('n3xtify-checkout-info', JSON.stringify(checkoutInfo))
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

               <button className='btn'>CONTINUE TO PAYMENT</button>

               {error && <p className={`mb-0 mt-3 ${styles.error}`}>{error}</p>}
          </form>
     )
}
