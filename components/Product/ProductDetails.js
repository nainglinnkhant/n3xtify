import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useInit from '../../hooks/useInit'
import useControlState from '../../hooks/useControlState'
import { addToCart, updateCart } from '../../store/cart/cart-actions'
import { buyNowActions } from '../../store/buy-now/buy-now-slice'
import { formatPrice } from '../../utils/utils'
import Spinner from '../UI/Spinner'
import styles from '../../styles/ProductDetails.module.css'

export default function ProductDetails({ product }) {
     const router = useRouter()
     const dispatch = useDispatch()

     const userId = useSelector(state => state.auth.userId)
     const cartItems = useSelector(state => state.cart.items)

     const [quantity, setQuantity] = useState(1)
     const quantityNum = Number(quantity)

     const { loading: cartLoading, error: cartError } = useInit()

     const { loading, error, fetchRequest } = useControlState()

     const handleAddToCart = () => {
          if(userId) {
               const item = cartItems.find(item => item.id === product.id)

               item 
               ? fetchRequest(updateCart.bind(null, userId, item.firebaseId, { 
                    ...product,
                    quantity: quantityNum + item.quantity
                 }))
               : fetchRequest(addToCart.bind(null, userId, { ...product, quantity: quantityNum }))
          } else {
               router.push('/auth')
          }
     }

     const handleBuyItNow = () => {
          if(userId) {
               dispatch(buyNowActions.setBuyNowItem([{ ...product, quantity: quantityNum }]))
               router.push('/checkout?method=buy-now')
          } else {
               router.push('/auth')
          }
     }

     return (
          <div className={`container py-4 py-md-5 ${styles.product}`}>
               <div className='row pt-2 pt-md-0'>
                    <div className='col-12 col-md-6'>
                         <div className={`${styles['img-container']} position-relative`}>
                              <Image 
                                   src={product.image} 
                                   alt={product.title} 
                                   layout='fill'
                              />
                         </div>
                    </div>

                    <div className='col-12 col-md-6'>
                         <h2 className='fs-6 mt-md-2 mb-3'>{product.title}</h2>
                         <p className='fs-6 mb-4'>{formatPrice(product.price)}</p>

                         <div className='d-flex align-items-center'>
                              <input 
                                   type='number' 
                                   id='quantity' 
                                   className='form-control d-inline-block me-2 px-2 py-1'
                                   value={quantity}
                                   onChange={(e) => setQuantity(e.target.value)}
                                   min='1'
                                   max='20'
                              />
                              <label htmlFor='quantity'>Quantity</label>
                         </div>

                         <button 
                              className={`btn ${styles['btn-cart']}`} 
                              onClick={handleAddToCart}
                              disabled={cartLoading || cartError || quantityNum < 1 || quantityNum > 20}
                         >
                              {loading ? <Spinner /> : 'ADD TO CART'}
                         </button>
                         {error && <p className={`mt-2 ${styles.error}`}>{error}</p>}

                         <button className={`btn ${styles['btn-buy']}`} onClick={handleBuyItNow}>
                              BUY IT NOW
                         </button>
                    </div>
               </div>

               <h3 className='d-inline-block fs-6 me-3 mt-5'>Category:</h3>
               <span>{product.category}</span>
               
               <p className={`mt-3 ${styles.description}`}>{product.description}</p>
          </div>
     )
}
