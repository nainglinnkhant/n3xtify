import { formatPrice } from '../../utils/utils'
import CheckoutItem from './CheckoutItem'

export default function CheckoutInfo({ items, subtotal, shipping, total }) {
     return (
          <div className='col-md-6 pe-lg-4 order-first order-md-2'>
               <ul className='pt-2 border-bottom'>
                    {items.map(item => (
                         <CheckoutItem key={item.id} item={item} />
                    ))}
               </ul>

               <div className='d-flex justify-content-between ps-md-1'>
                    <p>Subtotal</p>
                    <p>{formatPrice(subtotal)}</p>
               </div>

               <div className='d-flex justify-content-between border-bottom mb-3 ps-md-1'>
                    <p>Shipping</p>
                    <p>{formatPrice(shipping)}</p>
               </div>

               <div className='d-flex justify-content-between ps-md-1'>
                    <p>Total</p>
                    <p>{formatPrice(total)}</p>
               </div>
          </div>
     )
}
