import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../css/adminAsideBar.css"
// import '../css/dropdown.css'

const AdminAsideBar = () => {
  

  return (
    <div className='adminAsideBar'>
      <h1>Admin</h1>
      <NavLink to={"/admin/users"} className={(e)=>{return e.isActive?"active":" "}} >Users</NavLink>
      <NavLink to={'/admin/allItems'} className={(e) => (e.isActive ? "active" : " ")}>Items</NavLink>
      <NavLink to={"/admin/orders"} className={(e)=>{return e.isActive?"active":" "}} >Orders</NavLink>
      <NavLink to={"/admin/contact"} className={(e)=>{return e.isActive?"active":" "}} >Contact</NavLink>
    </div>
  )
}

export default AdminAsideBar
