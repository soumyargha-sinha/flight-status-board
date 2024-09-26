import React from 'react'
import { NavLink } from 'react-router-dom';
import './style.css';
const Navbar: any  = () => {
    const linkClass = ({isActive}: any) => isActive ? 'active' : '';
    return (
        <>
            <nav>
                <NavLink to='/' className={linkClass}>Home</NavLink>
                <NavLink to='/flights' className={linkClass}>Flights</NavLink>
            </nav>
        </>
    )
}

export default Navbar