import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

const useControlState = () => {
     const dispatch = useDispatch()
     const [loading, setLoading] = useState(false)
     const [error, setError] = useState(null)

     const fetchRequest =  useCallback(async (dispatchFunc) => {
          let resolved = false

          setError(null)
          setLoading(true)
          try {
               await dispatch(dispatchFunc())
               resolved = true
          } catch(error) {
               setError(error.message)
          }
          setLoading(false)
          return resolved
     }, [dispatch])

     return {
          loading,
          error,
          setError,
          fetchRequest
     }
}

export default useControlState