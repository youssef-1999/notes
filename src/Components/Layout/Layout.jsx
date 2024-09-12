import React from 'react'
import NavbarComp from '../Navbar/Navbar'
import {Outlet} from 'react-router-dom'

function Layout() {
  return (
    <div>
      <NavbarComp/>
      <div className="container">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
