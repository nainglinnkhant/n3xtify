import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import useControlState from '../../hooks/useControlState'
import { checkout } from '../../store/cart/cart-actions'
import { formatPrice } from '../../utils/utils'
import Spinner from '../UI/Spinner'
import styles from '../../styles/PaymentForm.module.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function PaymentForm({ onStepChange, total, shipping, orderId }) {
     const router = useRouter()

     const userId = useSelector(state => state.auth.userId)
     const cartItems = useSelector(state => state.cart.items)
     const buyNowItem = useSelector(state => state.buyNow.item)

     const { loading, error, fetchRequest } = useControlState()

     const handleSubmit = (e) => {
          e.preventDefault()

          if(router.query.method === 'buy-now') {
               const payload = {
                    userId,
                    orderId,
                    total: buyNowItem[0].price + shipping,
                    details: { items: buyNowItem, shipping },
                    type: 'buy-now',
               }
               fetchRequest(checkout.bind(null, payload))
               .then((res) => {
                    if(res) onStepChange(3)
               })
          } else {
               const payload = { 
                    userId, 
                    orderId,
                    total, 
                    details: { items: cartItems, shipping }, 
                    type: 'cart' 
               }
               fetchRequest(checkout.bind(null, payload))
               .then((res) => {
                    if(res) onStepChange(3)
               })
          }
     }

     return (
          <Elements stripe={stripePromise}>
               <ElementsConsumer>
                    {() => (
                         <form onSubmit={handleSubmit} className={`pt-1 ${styles['payment-form']}`}>
                              <CardElement />
                              <div className='mt-4'>
                                   <button 
                                        className={`btn me-3 ${styles['btn-pay']}`} 
                                   >
                                        {loading ? <Spinner /> : `PAY ${formatPrice(total)}`}
                                   </button>

                                   <button 
                                        type='button'
                                        className={`btn ${styles['btn-back']}`} 
                                        onClick={() => onStepChange(1)}
                                   >
                                        back
                                   </button>
                              </div>

                              {error && <p className={`mt-2 ${styles.error}`}>{error}</p>}
                         </form>
                    )}
               </ElementsConsumer>
          </Elements>
     )
}
