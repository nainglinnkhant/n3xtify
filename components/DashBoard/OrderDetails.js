import ReactDOM from 'react-dom'
import { formatPrice } from '../../utils/utils'
import CheckoutItem from '../Checkout/CheckoutItem'
import styles from '../../styles/OrderDetails.module.css'

export default function OrderDetails({ details, onClose }) {
    const { items, shipping } = details

    return (
        <>
            {ReactDOM.createPortal(
                <>
                    <div className={styles.backdrop} onClick={onClose}></div>

                    <dialog className={styles['order-details']} open>
                        <button className='btn' onClick={onClose}>
                            <span className='hidden'>Close</span>
                            <i className='fas fa-times'></i>
                        </button>

                        <ul>
                            {items.map((item) => (
                                <CheckoutItem key={item.id} item={item} />
                            ))}
                        </ul>

                        <p className='mb-0'>Shipping: {formatPrice(shipping)}</p>
                    </dialog>
                </>,
                document.getElementById('__next')
            )}
        </>
    )
}
