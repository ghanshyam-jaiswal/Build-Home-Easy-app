import React from 'react'
// import AdminAsideBar from './AdminAsideBar'
import { Outlet } from 'react-router-dom'
import "../css/admin.css"
import AdminAsideBar from './AdminAsideBar'
const Admin = () => {
  return (
    <div className='admin'>
      {/* <h1>Admin</h1> */}
      <AdminAsideBar/>
      <Outlet/>
    </div>
  )
}

export default Admin
