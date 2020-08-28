import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

import Logo from '../../assets/pAirplane3.png'

const Header = () => {
    return (
        <header className="header">
            <div className="wrap">
                Fly Fitness
                <div className="logo">
                    <Link to='/'>
                        <img src={Logo} alt="FlyDev Logo" />
                    </Link>
                </div>
                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to='/registration'>
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
