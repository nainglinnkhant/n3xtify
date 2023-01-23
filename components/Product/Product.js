import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { formatPrice } from '../../utils/utils'
import styles from '../../styles/Product.module.css'

export default function Product({ product }) {
    const router = useRouter()
    const [imageLoaded, setImageLoaded] = useState(false)

    const viewProduct = () => {
        router.push(`/${product.id}`)
    }

    const handleImageLoad = () => setImageLoaded(true)

    return (
        <div className={`col ${styles.product} text-center`}>
            <div className={styles['img-container']} onClick={viewProduct}>
                <div className={styles.overlay}></div>

                <Image
                    id={product.id}
                    src={product.image}
                    alt={product.title}
                    className={`img-fluid ms-auto me-auto ${imageLoaded ? 'block' : 'hidden'}`}
                    layout='fill'
                    onLoad={handleImageLoad}
                />

                {!imageLoaded && <div className={styles.skeleton} />}
            </div>

            <h2 className='mt-3 mt-lg-4' onClick={viewProduct}>
                {product.title}
            </h2>
            <p className='mt-2'>{formatPrice(product.price)}</p>
        </div>
    )
}
