import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchProductsStart } from '../../redux/products/products.actions'
import Product from './Product'
import FormSelect from '../forms/FormSelect'
import './styles.scss'

const ProductResults = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { filterType } = useParams()

    const { product } = useSelector(state => state.productsData)
    console.log(product)
    useEffect(() => {
        dispatch(fetchProductsStart({ filterType }))
    }, [filterType])


    const handleFilter = e => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`)
    }

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: "Show all",
            value: ''
        }, {
            name: "Mens",
            value: 'mens',
        }, {
            name: "Womens",
            value: 'womens'
        }],
        handleChange: handleFilter
    }

    if (product.length < 1) return (
        <div className='products'>
            <h1>Browse Products</h1>
            <FormSelect {...configFilters} />
        </div>
    )

    return (

        <div className='products'>
            <h1>Browse Products</h1>

            <FormSelect {...configFilters} />

            <div className="productResults">
                {
                    product ?
                        product.map((product, i) => <Product product={product} key={i} />)
                        :
                        <div>No products to display</div>
                }
            </div>
        </div>

    )
}

export default ProductResults
