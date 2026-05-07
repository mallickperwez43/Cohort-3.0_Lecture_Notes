import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <Header />

            <div style={{ height: '90vh', backgroundColor: "purple" }}>
                <Outlet />
            </div>

            <div style={{ backgroundColor: "green" }}>
                footer
            </div>

        </div>
    )
}

export default Layout
