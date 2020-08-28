import React from 'react'
import './styles.scss'

import Logo from '../../assets/pAirplane3.png'

const Header = () => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <img src={Logo} alt="FlyDev Logo"/>
                </div>
            </div>
        </header>
    )
}

export default Header
