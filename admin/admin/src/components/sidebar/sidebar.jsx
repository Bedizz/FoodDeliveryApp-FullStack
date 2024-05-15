import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'


const sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-options'>
            <NavLink to='/addProduct' className="sidebar-option">
                <img src={assets.add_icon} alt="" /><p>Add Items</p>
            </NavLink>
            <NavLink to='/listProduct' className="sidebar-option">
                <img src={assets.order_icon} alt="" /><p>List Items</p>
            </NavLink>
            <NavLink to='/orderProduct' className="sidebar-option">
                <img src={assets.order_icon} alt="" /><p>Orders Items</p>
            </NavLink>
        </div>        
    </div>
  )
}

export default sidebar