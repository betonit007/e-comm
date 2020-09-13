import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from '../UserProfile'
import './styles.scss'

const VerticalNav = ({ children }) => {
    const { currentUser } = useSelector(state => state.user)

    const configUserProfile = {
        currentUser
    }

    return (
        <div className='verticalNav'>
            <UserProfile {...configUserProfile} />

            <div className="menu">
                {children}
            </div>
        </div>
    )
}

export default VerticalNav
