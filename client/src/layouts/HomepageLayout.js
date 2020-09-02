import React from 'react'
import Header from '../components/Header'
import Footer from '../components/footer'

const HomepageLayout = ({children, currentUser}) => {
    return (
        <div className='fullHeight'>
            <Header currentUser={currentUser}/>
            {children}
            <Footer />
        </div>
    )
}

export default HomepageLayout
