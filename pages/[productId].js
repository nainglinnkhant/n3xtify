import Head from 'next/head'
import ProductDetails from '../components/Product/ProductDetails'

export default function ProductPage({ product }) {
    return (
        <>
            <Head>
                <title>N3xtify</title>
                <meta name='description' content={product.title} />
            </Head>

            <ProductDetails product={product} />
        </>
    )
}

export const getStaticPaths = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const products = await response.json()

    return {
        fallback: false,
        paths: products.map((product) => ({
            params: {
                productId: product.id.toString(),
            },
        })),
    }
}

export const getStaticProps = async (context) => {
    const { productId } = context.params
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
    const product = await response.json()

    return {
        props: {
            product,
        },
        revalidate: 1,
    }
}
