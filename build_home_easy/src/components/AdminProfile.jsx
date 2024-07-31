import React, { useEffect, useState } from 'react';
import '../css/adminProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminProfile = () => {

  let navigate=useNavigate()

  let [adminEmail,setAdminEmail]=useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    profile:''
 
  });


  useEffect(()=>{
    let admin=localStorage.getItem('admin')
    if(admin===null || admin===''){
      navigate('/login')
    }
    else{
      setAdminEmail(localStorage.getItem('admin'))
    }
  },[navigate])


  useEffect(()=>{
    fetchAdminDetails()
    // console.log("adminEmail2",adminEmail)
    // console.log("profileDetails",profileDetails)
  },[adminEmail])

  let fetchAdminDetails = async ()=>{
    let payload={
      eventID: "1001",
      addInfo: {
        email:adminEmail
      }
    }
    let response = await axios.post('http://localhost:5164/homeGetAdminByEmail',payload)
    // console.log("admin res",response.data.rData.users[0])
    if(response.data.rData.rMessage==="Successful"){
      let data = response.data.rData.users[0]
      setProfileDetails({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        password:data.password,
        profile:data.profile
      })
    }
  }


  const handleEditClick = () => {
    setIsEditing(true);
  };


  const handleSaveClick = async () => {
    let payload={
      eventID: "1001",
      addInfo: {
        first_name:profileDetails.firstName,
        last_name:profileDetails.lastName,
        email:profileDetails.email,
        password:profileDetails.password,
        profile:profileDetails.profile,
      }
    }
    // console.log("upload",payload)
    let response = await axios.post('http://localhost:5164/homeUpdateAdminByEmail',payload)
    console.log('upld res',response)
    if(response.data.rData.rMessage==="UPDATE SUCCESSFULLY"){
      setIsEditing(false);
      toast.success("Updated Successfull")
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };


  return (
    <div className="admin-profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Admin Profile</h1>
        <div className="profile-info">
          {/* <img src={profileDetails.profile} alt="Profile" className="profile-image" /> */}
          {/* <img src='' alt="Profile" className="profile-image" /> */}
          <div className="profile-details">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder='Firs tName'
                  value={profileDetails.firstName}
                  onChange={handleInputChange}
                  className="profile-input"
                />
                <input
                  type="text"
                  name="lastName"
                   placeholder='Last Name'
                  value={profileDetails.lastName}
                  onChange={handleInputChange}
                  className="profile-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder='Email'
                  value={profileDetails.email}
                  onChange={handleInputChange}
                  className="profile-input"
                />
                <input
                  type="text"
                  name="password"
                  placeholder='Password'
                  value={profileDetails.password}
                  onChange={handleInputChange}
                  className="profile-input"
                />
                <p>Role: Admin</p>
                {/* <p>Joined: {profileDetails.joined}</p> */}
              </>
            ) : (
              <>
                <h2>{profileDetails.firstName || '--'} {profileDetails.lastName || '--'}</h2>
                <p>Email: {profileDetails.email}</p>
                <p>Role: Admin</p>
                {/* <p>Joined: {profileDetails.joined}</p> */}
              </>
            )}
          </div>
        </div>
        {isEditing ? (
          <button className="save-profile-btn" onClick={handleSaveClick}>Save Profile</button>
        ) : (
          <button className="edit-profile-btn" onClick={handleEditClick}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
