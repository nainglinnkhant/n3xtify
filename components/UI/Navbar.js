import { useSelector } from 'react-redux'
import Link from 'next/link'
import Sidebar from './Sidebar'
import Cart from '../Cart/Cart'
import styles from '../../styles/Navbar.module.css'

export default function Navbar() {
     const userId = useSelector(state => state.auth.userId)

     return (
          <div className={`${styles.navbar} container-fluid py-2 py-md-3`}>
               <nav className='row align-items-center px-1 px-md-5'>
                    <Sidebar />

                    <div className='col-4 text-center'>
                         <Link href='/'>N3xtify</Link>
                    </div>

                    <div className='col-4 text-end'>
                         <button className='btn me-2 p-0'>
                              <Link href={userId ? '/dashboard' : '/auth'}>
                                   <i className='fas fa-user fs-5'></i>
                              </Link>
                         </button>

                         <Cart />
                    </div>
               </nav>
          </div>
     )
}
