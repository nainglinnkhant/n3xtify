import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { authActions } from '../../store/auth/auth-slice'
import { productActions } from '../../store/products/products-slice'
import { cartActions } from '../../store/cart/cart-slice'
import { buyNowActions } from '../../store/buy-now/buy-now-slice'
import { dashboardActions } from '../../store/dashboard/dashboard-slice'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import styles from '../../styles/Sidebar.module.css'

export default function Sidebar() {
     const dispatch = useDispatch()
     const router = useRouter()

     const userId = useSelector(state => state.auth.userId)
     const [show, setShow] = useState(false)

     const handleShow = () => setShow(true)
     const handleClose = () => setShow(false)

     const handleFilter = (filter) => {
          dispatch(productActions.setFilter(filter))
          router.push('/')
          handleClose()
     }

     const handleLogin = () => {
          router.push('/auth')
          handleClose()
     }

     const handleLogout = () => {
          dispatch(authActions.logout())
          dispatch(cartActions.emptyCart())
          dispatch(buyNowActions.emptyBuyNow())
          dispatch(dashboardActions.clearDashBoard())
          handleClose()

          if(router.pathname.includes('checkout') || router.pathname.includes('dashboard')) {
               router.replace('/')
          }
     }

     return (
          <div className='col-4'>
               <button className='btn p-0' onClick={handleShow}>
                    <i className='fas fa-bars fs-5'></i>
               </button>

               <Offcanvas show={show} onHide={handleClose} className={styles.offcanvas}>
                    <Offcanvas.Header className='d-flex justify-content-end'>
                         <Button variant='dark' onClick={handleClose}>
                              <i className='fas fa-times'></i>
                         </Button>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                         <ul className={styles.list}>
                              <li onClick={() => handleFilter('all')}>All</li>
                              <li onClick={() => handleFilter('electronics')}>Electronics</li>
                              <li onClick={() => handleFilter('jewelery')}>Jewelry</li>
                              <li onClick={() => handleFilter('men\'s clothing')}>Men's Clothing</li>
                              <li onClick={() => handleFilter('women\'s clothing')}>Women's Clothing</li>
                              {!userId && <li onClick={handleLogin}>Login</li>}
                              {userId && <li onClick={handleLogout}>Logout</li>}
                         </ul>
                    </Offcanvas.Body>
               </Offcanvas>
          </div>
     )
}
