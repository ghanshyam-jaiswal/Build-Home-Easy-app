import React from 'react'
import '../css/adminProfile.css'

const AdminProfile = () => {
  return (
    // <div  style={{width:'100vw',height:'90vh',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'1vw'}} >
    //   <h1>Admin Profile</h1>
    // </div>

    <div className="admin-profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Admin Profile</h1>
        <div className="profile-info">
          <img src="profile-placeholder.png" alt="Profile" className="profile-image" />
          <div className="profile-details">
            <h2>John Doe</h2>
            <p>Email: john.doe@example.com</p>
            <p>Role: Admin</p>
            <p>Joined: January 2022</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdminProfile
