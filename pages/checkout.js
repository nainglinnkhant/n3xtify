import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useInit from '../hooks/useInit'
import { generateId } from '../utils/utils'
import CheckoutForm from '../components/Checkout/CheckoutForm'
import CheckoutInfo from '../components/Checkout/CheckoutInfo'
import PaymentForm from '../components/Checkout/PaymentForm'
import Confirmation from '../components/Checkout/Confirmation'
import Dialog from '../components/UI/Dialog'
import RouteGuard from '../components/RouteGuard/RouteGuard'
import styles from '../styles/Checkout.module.css'

const MIN_SHIPPING_COST = 15

export default RouteGuard(function Checkout() {
    const router = useRouter()

    useInit()

    const cartItems = useSelector((state) => state.cart.items)
    const buyNowItem = useSelector((state) => state.buyNow.item)
    const items = router.query.method === 'buy-now' ? buyNowItem : cartItems

    const [step, setStep] = useState(1)
    const [shipping, setShipping] = useState(MIN_SHIPPING_COST)
    const [showDialog, setShowDialog] = useState(true)
    const [fillForm, setFillForm] = useState(false)
    const [orderId] = useState(generateId())

    const handleStepChange = (step) => {
        setStep(step)
    }

    const subtotal = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    const total = subtotal + shipping
    const dialogMessage = 'Do you want to fill out the contact information with your profile info?'

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        return () => {
            localStorage.removeItem('n3xtify-checkout-info')
        }
    }, [])

    if (!mounted) return null

    if (step === 3) {
        return (
            <>
                <Head>
                    <title>N3xtify | Confirmation</title>
                </Head>
                <Confirmation orderId={orderId} />
            </>
        )
    }

    return (
        <>
            <Head>
                <title>N3xtify | Checkout</title>
            </Head>

            <div className={`container ${styles.checkout}`}>
                {showDialog && (
                    <Dialog
                        message={dialogMessage}
                        onClose={() => setShowDialog(false)}
                        setFillForm={setFillForm}
                    />
                )}

                <div className='row py-4 py-md-5 order-md-1'>
                    <div className='col-md-6'>
                        <p className='mb-4 mt-4 mt-md-0'>
                            <span
                                className={`me-2 ${step >= 1 ? styles.active : ''} ${styles.step}`}
                            >
                                Information
                            </span>

                            <i className='fas fa-chevron-right'></i>

                            <span
                                className={`ms-2 ${step > 1 ? styles.active : ''} ${styles.step}`}
                            >
                                Payment
                            </span>
                        </p>

                        {step === 1 && !showDialog && (
                            <CheckoutForm
                                onStepChange={handleStepChange}
                                setShipping={setShipping}
                                minShippingCost={MIN_SHIPPING_COST}
                                fillForm={fillForm}
                            />
                        )}

                        {step > 1 && (
                            <PaymentForm
                                onStepChange={handleStepChange}
                                total={total}
                                shipping={shipping}
                                orderId={orderId}
                            />
                        )}
                    </div>

                    <CheckoutInfo
                        items={items}
                        subtotal={subtotal}
                        shipping={shipping}
                        total={total}
                    />
                </div>
            </div>
        </>
    )
})
