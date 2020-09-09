import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import './styles.scss'

import Logo from '../../assets/pAirplane3.png'


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})


const Header = () => {

    const { currentUser } = useSelector(mapState)

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
                                <Link to='/dashboard'>
                                    Account
                               </Link>
                            </li>
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
