import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import './styles.scss'

import Logo from '../../assets/pAirplane3.png'

const Header = ({ currentUser }) => {

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

                    {currentUser ?
                        <ul>
                            <li>
                                <p className='logout' onClick={
                                    () => {
                                        auth.signOut()
                                        toast("You have successfully logged out.")
                                    }
                                }
                                >Logout</p>
                            </li>
                        </ul>

                        :
                        <ul>
                            <li>
                                <Link to='/registration'>
                                    Register
                               </Link>
                            </li>
                            <li>
                                <Link to='/login'>
                                    Login
                               </Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
