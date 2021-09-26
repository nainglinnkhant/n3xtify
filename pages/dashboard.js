import { useEffect, useState } from 'react'
import Head from 'next/head'
import useInit from '../hooks/useInit'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import UserInfoForm from '../components/DashBoard/UserInfoForm'
import OrderHistory from '../components/DashBoard/OrderHistory'
import routeGuard from '../components/RouteGuard/routeGuard'
import styles from '../styles/Dashboard.module.css'

export default routeGuard(function Dashboard() {
     const [mounted, setMounted] = useState(false)
     const [key, setKey] = useState('user-info')

     useEffect(() => {
          setMounted(true)
     }, [])

     useInit()

     if(!mounted) return null

     return (
          <>
               <Head>
                    <title>N3xtify | Dashboard</title>
               </Head>

               <div className={`container pb-3 ${styles['user-info']}`}>
                    <div className='row'>
                         <div className='col-12 col-lg-8 offset-lg-2'>
                              <Tabs
                                   id="controlled-tab-example"
                                   activeKey={key}
                                   onSelect={(key) => setKey(key)}
                                   className="mb-3"
                              >
                                   <Tab eventKey="user-info" title="User Info">
                                        <UserInfoForm />
                                   </Tab>

                                   <Tab eventKey="order-history" title="Order History">
                                        <OrderHistory />
                                   </Tab>
                              </Tabs>
                         </div>
                    </div>
               </div>
          </>
     )
})