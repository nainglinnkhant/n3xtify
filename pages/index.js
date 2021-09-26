import { useSelector } from 'react-redux'
import Head from 'next/head'
import useInit from '../hooks/useInit'
import Product from '../components/Product/Product'

export default function Home({ products }) {
     const filter = useSelector(state => state.products.filter)

     useInit()

     if(filter !== 'all') {
          products = products.filter(product => product.category === filter)
     }

     return (
          <>
               <Head>
                    <title>N3xtify</title>
                    <meta
                         name='description'
                         content='Buy the quality products with ease!'
                    />
               </Head>
               
               <div className='container pt-4 pt-sm-5 pb-4 pb-xl-5'>
                    <div className='row row-cols-2 row-cols-md-3 row-cols-lg-4 gy-3 gy-md-4'>
                         {products.map(product => (
                              <Product key={product.id} product={product} />
                         ))}
                    </div>
               </div>
          </>
     )
}

export const getStaticProps = async () => {
     const response = await fetch('https://fakestoreapi.com/products')
     const products = await response.json()

     return {
          props: {
               products
          },
          revalidate: 1
     }
}
