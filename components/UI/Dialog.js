import ReactDOM from 'react-dom'
import styles from '../../styles/Dialog.module.css'

export default function Dialog({ message, onClose, setFillForm }) {
    const handleYes = () => {
        setFillForm(true)
        onClose()
    }

    const handleNo = () => {
        setFillForm(false)
        onClose()
    }

    return (
        <>
            {ReactDOM.createPortal(
                <>
                    <div className={styles.backdrop}></div>

                    <dialog className={styles.dialog} open>
                        <h5>{message}</h5>

                        <button onClick={handleYes} className={`btn ${styles['btn-yes']}`}>
                            YES
                        </button>
                        <button onClick={handleNo} className={`btn ms-2 ${styles['btn-no']}`}>
                            NO
                        </button>
                    </dialog>
                </>,
                document.getElementById('__next')
            )}
        </>
    )
}
