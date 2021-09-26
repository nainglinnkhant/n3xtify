import { useRouter } from 'next/router'

const RouteGuard = (WrappedComponent, authGuard = true) => {
     return (props) => {
          if (typeof window !== 'undefined') {
               const router = useRouter()

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

export default RouteGuard