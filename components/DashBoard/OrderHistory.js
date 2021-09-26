import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useControlState from '../../hooks/useControlState'
import { fetchOrderHistory } from '../../store/dashboard/dashboard-actions'
import OrderItem from './OrderItem'
import styles from '../../styles/OrderHistory.module.css'

export default function OrderHistory() {
     const userId = useSelector(state => state.auth.userId)
     const orderHistory = useSelector(state => state.dashboard.orderHistory)

     const { fetchRequest } = useControlState()

     const { length: orderHistoryLength } = orderHistory

     useEffect(() => {
          if(!userId || orderHistoryLength !== 0) return

          fetchRequest(fetchOrderHistory.bind(null, userId))
     }, [fetchRequest, userId, orderHistoryLength])

     if(orderHistory.length === 0) {
          return <p className='text-center mt-4'>You don't have any order history yet.</p>
     }

     return (
          <table className={`table ${styles.table}`}>
               <thead>
                    <tr>
                         <th>Order No</th>
                         <th>Total</th>
                         <th>Date</th>
                         <th className={styles.details}></th>
                    </tr>
               </thead>

               <tbody>
                    {orderHistory.map(order => (
                         <OrderItem key={order.id} order={order} />
                    ))}
               </tbody>
          </table>
     )
}
