import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useOffcanvasStateContext } from '../../context/OffcanvasStateContext'
import useControlState from '../../hooks/useControlState'
import { emptyCart, updateCart } from '../../store/cart/cart-actions'
import { formatPrice } from '../../utils/utils'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import CartItem from './CartItem'
import Spinner from '../UI/Spinner'
import styles from '../../styles/Cart.module.css'

export default function Cart() {
    const router = useRouter()

    const { show, openOffcanvas, closeOffcanvas } = useOffcanvasStateContext()

    const userId = useSelector((state) => state.auth.userId)
    const cartItems = useSelector((state) => state.cart.items)

    const cartItemsCount = cartItems.reduce((acc, cur) => acc + cur.quantity, 0)
    const subtotal = cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    const inCheckout = router.pathname.includes('checkout')

    const { loading, fetchRequest } = useControlState()

    const handleUpdateCart = (item, method) => {
        const product =
            method === 'increase'
                ? { ...item, quantity: item.quantity + 1 }
                : { ...item, quantity: item.quantity - 1 }

        fetchRequest(updateCart.bind(null, userId, item.firebaseId, product))
    }

    const handleEmptyCart = () => {
        fetchRequest(emptyCart.bind(null, userId))
    }

    const handleCheckout = () => {
        router.push('/checkout')
        closeOffcanvas()
    }

    return (
        <>
            <button
                className='btn ms-2 p-0 position-relative'
                onClick={openOffcanvas}
                disabled={inCheckout}
            >
                <span className='hidden'>Cart</span>
                <i className='fas fa-shopping-cart fs-5'></i>
                {cartItemsCount > 0 && (
                    <span className={styles['item-count']}>{cartItemsCount}</span>
                )}
            </button>

            <Offcanvas show={show} onHide={closeOffcanvas} placement='end'>
                <Offcanvas.Header>
                    <div className='d-flex justify-content-between align-items-center w-100 mx-1'>
                        <h1 className='fs-5 mb-0'>Cart</h1>

                        <Button variant='light' onClick={closeOffcanvas}>
                            <span className='hidden'>Close</span>
                            <i className='fas fa-times'></i>
                        </Button>
                    </div>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <div className='d-flex flex-column h-100'>
                        {cartItems.length === 0 && (
                            <p className={styles.empty}>Your cart is currently empty.</p>
                        )}

                        {cartItems.length > 0 && (
                            <ul className={styles.cart}>
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateCart={handleUpdateCart}
                                    />
                                ))}
                            </ul>
                        )}

                        {cartItems.length > 0 && (
                            <button
                                className={`btn ${styles['btn-empty']}`}
                                onClick={handleEmptyCart}
                                disabled={loading}
                            >
                                {loading ? <Spinner red /> : 'EMPTY CART'}
                            </button>
                        )}

                        <div className={styles.checkout}>
                            <div className='d-flex justify-content-between'>
                                <p>SUBTOTAL</p>
                                <p className='me-1'>{formatPrice(subtotal)}</p>
                            </div>

                            <button
                                className='btn'
                                disabled={loading || cartItems.length === 0}
                                onClick={handleCheckout}
                            >
                                {loading ? <Spinner /> : 'CHECKOUT'}
                            </button>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
