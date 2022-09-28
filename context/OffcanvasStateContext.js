import { createContext, useContext, useState } from 'react'

const OffcanvasStateContext = createContext({
    show: false,
    openOffcanvas: () => {},
    closeOffcanvas: () => {},
})

export const useOffcanvasStateContext = () => useContext(OffcanvasStateContext)

const OffcanvasStateProvider = ({ children }) => {
    const [show, setShow] = useState(false)

    const handleOpen = () => setShow(true)
    const handleClose = () => setShow(false)

    const contextValue = {
        show,
        openOffcanvas: handleOpen,
        closeOffcanvas: handleClose,
    }

    return (
        <OffcanvasStateContext.Provider value={contextValue}>
            {children}
        </OffcanvasStateContext.Provider>
    )
}

export default OffcanvasStateProvider
