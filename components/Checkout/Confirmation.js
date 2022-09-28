import { useRouter } from 'next/router'
import styles from '../../styles/Checkout.module.css'

export default function Confirmation({ orderId }) {
    const router = useRouter()

    const handleGoBackHome = () => {
        router.replace('/')
    }

    return (
        <div className='container'>
            <div className='row py-4 py-md-5'>
                <div className='col-12 col-md-6 offset-md-3 text-center'>
                    <h1 className='fs-6 mb-3'>
                        Thank you for your purchase. Your order is placed.
                    </h1>

                    <h1 className='fs-6'>
                        Your order no is <span className='fw-bold'>{orderId}</span>.
                    </h1>

                    <button className={`btn ${styles['btn-home']}`} onClick={handleGoBackHome}>
                        Go Back Home
                    </button>
                </div>
            </div>
        </div>
    )
}
