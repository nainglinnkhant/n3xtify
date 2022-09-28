import router from 'next/router'

export default function RouteGuard(WrappedComponent, authGuard = true) {
    return function Guard(props) {
        if (typeof window !== 'undefined') {
            const userId = localStorage.getItem('n3xtify-userId')

            const isProtected = authGuard ? !userId : userId

            if (isProtected) {
                router.replace('/')
                return null
            }

            return <WrappedComponent {...props} />
        }

        return null
    }
}
