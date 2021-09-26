import { useRouter } from 'next/router'
import Image from 'next/image'
import { formatPrice, formatTitle } from '../../utils/utils'
import styles from '../../styles/Cart.module.css'

export default function CartItem({ item, onUpdateCart }) {
     const router = useRouter()

     const viewProduct = () => {
          router.push(`/${item.id}`)
     }

     return (
          <li className='border-bottom'>
               <div className='row'>
                    <div className='col-3 p-0'>
                         <div className={styles['img-container']} onClick={viewProduct}>
                              <div className={styles.overlay}></div>
                              <Image 
                                   src={item.image} 
                                   alt={item.title}
                                   layout='fill'
                              />
                         </div>
                    </div>

                    <div className='col-9'>
                         <p className={`mt-1 ${styles.title}`} onClick={viewProduct}>
                              {formatTitle(item.title, 50)}
                         </p>

                         <div className='d-flex justify-content-between align-items-center'>
                              <div>
                                   <button 
                                        className='btn' 
                                        onClick={() => onUpdateCart(item, 'decrease')}
                                   >
                                        -
                                   </button>

                                   <span className='mx-2'>{item.quantity}</span>

                                   <button 
                                        className='btn' 
                                        onClick={() => onUpdateCart(item, 'increase')}
                                   >
                                        +
                                   </button>
                              </div>
                              <p className='mb-0 me-3'>{formatPrice(item.price * item.quantity)}</p>
                         </div>
                    </div>
               </div>
          </li>
     )
}
