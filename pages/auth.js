import { useState, useEffect } from 'react'
import Head from 'next/head'
import useInit from '../hooks/useInit'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import RouteGuard from '../components/RouteGuard/RouteGuard'
import styles from '../styles/Auth.module.css'

export default RouteGuard(function Auth() {
    const [mounted, setMounted] = useState(false)
    const [authMode, setAuthMode] = useState('login')

    useEffect(() => {
        setMounted(true)
    }, [])

    useInit()

    const handleAuthSwitch = (authMode) => {
        setAuthMode(authMode)
    }

    if (!mounted) return null

    return (
        <>
            <Head>
                <title>N3xtify | Login</title>
            </Head>

            <div className={`container ${styles.auth} pb-4`}>
                <div className='row'>
                    <div className='col-12 col-md-8 offset-md-2 col-xl-6 offset-xl-3'>
                        {authMode === 'login' && (
                            <>
                                <Login />
                                <p>
                                    Don't have an account?
                                    <span
                                        className='ms-1'
                                        onClick={() => handleAuthSwitch('sign up')}
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            </>
                        )}

                        {authMode === 'sign up' && (
                            <>
                                <Signup />
                                <p>
                                    Already have an account?
                                    <span
                                        className='ms-1'
                                        onClick={() => handleAuthSwitch('login')}
                                    >
                                        Login
                                    </span>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}, false)
