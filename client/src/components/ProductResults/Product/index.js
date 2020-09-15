import React from 'react'
import Button from '../../../components/forms/Button'
import './styles.scss'

const Product = ({ product: { productName, productPrice, productThumbnail } }) => {
    return (
        <div className='product'>
            <div className="thumb">
                <img src={productThumbnail} alt={productName} />
            </div>

            <div className="details">
                <span>{productName}</span>
                <span> ${productPrice}</span>
                <div className='addToCart'>
                    <Button
                        type="button"
                    >
                        Add to Cart
                </Button>
                </div>
            </div>
        </div>
    )
}

export default Product
