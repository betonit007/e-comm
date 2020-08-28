import React from 'react'
import Header from '../components/Header'
import Footer from '../components/footer'

const HomepageLayout = ({children}) => {
    return (
        <div className='fullHeight'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default HomepageLayout
