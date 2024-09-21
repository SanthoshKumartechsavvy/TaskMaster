import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='nav'>
      <ul>
        <li><NavLink to='/'> Todo </NavLink></li>
        <li><NavLink to='/doing'> Doing </NavLink></li>
        <li><NavLink to='/completed'> Done </NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav
