import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsStart } from '../../redux/products/products.actions'
import Product from './Product'
import './styles.scss'

const ProductResults = () => {

    const dispatch = useDispatch()

    const { product } = useSelector(state => state.productsData)
    console.log(product.length)
    useEffect(() => {
        dispatch(fetchProductsStart())
    }, [])

    if (product.length < 1) return (
        <div className='products'>

        </div>
    )

    return (

        <div className='products'>
            <h1>Browse Products</h1>
            <div className="productResults">
                {product && product.map((product, i) => <Product product={product} key={i} />)}
            </div>
        </div>

    )
}

export default ProductResults
