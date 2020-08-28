import React from 'react'
import Shopmen from '../../assets/shopMens.jpg'
import ShopWomen from '../../assets/shopWomens.jpg'
import './styles.scss'

const Directory = () => {
    return (
        <div className='directory'>
            <div className="wrap">
                <div
                    className='item'
                    style={{
                        backgroundImage: `url(${Shopmen})`
                    }}>
                        <a href="">
                            Shop Mens
                        </a>
                </div>
                <div
                    className='item'
                    style={{
                        backgroundImage: `url(${ShopWomen})`
                    }}>
                        <a href="">
                            Shop Womens
                        </a>
                </div>
            </div>
        </div>
    )
}

export default Directory
