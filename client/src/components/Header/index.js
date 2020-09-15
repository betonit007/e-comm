import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOutUserStart } from '../../redux/User/user.actions'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './styles.scss'

import Logo from '../../assets/pAirplane3.png'


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})


const Header = () => {
    const dispatch = useDispatch()

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

                <nav>
                    <ul>
                    <li>
                          <Link to='/'>
                              Home
                          </Link>
                        </li>
                        <li>
                          <Link to='/search'>
                              Search
                          </Link>
                        </li>
                    </ul>
                </nav>

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
                                        dispatch(signOutUserStart())
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
