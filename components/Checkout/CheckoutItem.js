import Image from 'next/image'
import { formatPrice, formatTitle } from '../../utils/utils'
import styles from '../../styles/CheckoutItem.module.css'

export default function CheckoutItem({ item }) {
    return (
        <li className={styles['checkout-item']}>
            <div className='row'>
                <div className='col-3'>
                    <div className={styles['img-container']}>
                        <Image src={item.image} alt={item.title} layout='fill' />
                    </div>
                </div>

                <div className='col-6'>
                    <div className='d-flex flex-column justify-content-between h-100 py-1'>
                        <p className='mb-0'>{formatTitle(item.title, 30)}</p>

                        <p className='mb-0'>
                            Quantity:<span className='ms-2'>{item.quantity}</span>
                        </p>
                    </div>
                </div>

                <div className='col-3 text-end'>
                    <p className='py-1'>{formatPrice(item.price * item.quantity)}</p>
                </div>
            </div>
        </li>
    )
}
