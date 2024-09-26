import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import './style.css'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout