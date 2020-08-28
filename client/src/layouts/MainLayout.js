import React from 'react'
import Header from '../components/Header'
import Footer from '../components/footer'

const MainLayout = ({children}) => {
    return (
        <div>
            <Header />
            <div className="main">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout
