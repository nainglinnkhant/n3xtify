import { useState } from 'react'
import { formatPrice } from '../../utils/utils'
import OrderDetails from './OrderDetails'

export default function OrderItem({ order }) {
     const [showDetails, setShowDetails] = useState(false)

     return (
          <>
               {showDetails && <OrderDetails details={order.details} onClose={() => setShowDetails(false)} />}

               <tr>
                    <td>{order.id}</td>

                    <td>{formatPrice(order.total)}</td>
                    
                    <td>{order.date}</td>

                    <td>
                         <button className='btn p-0' onClick={() => setShowDetails(true)}>
                              <span className='d-none d-md-inline-block'>View Details</span>
                              <i className='d-md-none d-inline-block fas fa-info-circle'></i>
                         </button>
                    </td>
               </tr>
          </>
     )
}
