import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../css/userProfileEdit.css"

const UserProfileEdit = () => {
    let {userDetails}=useLocation().state
    let navigate=useNavigate()

    useEffect(()=>{
        setEditDetails({
            first_name:userDetails.first_name,
            last_name:userDetails.last_name,
            gender:userDetails.gender,
            email:userDetails.email,
            password:userDetails.password,
            contact:userDetails.contact,
            street_address1:userDetails.street_address1,
            street_address2:userDetails.street_address2,
            city:userDetails.first_name.city,
            state:userDetails.state,
            pincode:userDetails.pincode,
            country:userDetails.country
        })
    },[])

    let [editDetails,setEditDetails]=useState({
        first_name:'',
        last_name:'',
        gender:'',
        email:'',
        password:'',
        contact:'',
        street_address1:'',
        street_address2:'',
        city:'',
        state:'',
        pincode:'',
        country:''
    })

  return (
    <div className='userProfileEdit'>
        <div className="edit">
            <button >Save</button>
            <button onClick={()=>{navigate('/profile')}}>Cancel</button>
        </div>
        <div className="profile">
           <img src="../assests/user-profile-logo-img.jpg" alt="img" />
           <div>
                <input type="text" placeholder='First Name' value={editDetails.first_name} onChange={(e)=>setEditDetails({...editDetails,first_name:e.target.value})} /> 
                <input type="text" placeholder='Last Name' value={editDetails.last_name} onChange={(e)=>setEditDetails({...editDetails,last_name:e.target.value})} />
            </div>
        </div>
        <div className="details">
            <div className='info'>
                <div className='title' ><h3>Gender</h3><p>:</p></div>
                <div><input type="text" value={editDetails.gender} /></div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Email</h3><p>:</p></div>
                <div><input type="email" placeholder='Email' value={editDetails.email} onChange={(e)=>setEditDetails({...editDetails,email:e.target.value})}/></div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Password</h3><p>:</p></div>
                <div><input type="text" placeholder='Password' value={editDetails.password} onChange={(e)=>setEditDetails({...editDetails,password:e.target.value})} /></div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Contact</h3><p>:</p></div>
                <div><input type="number" placeholder='Number' value={editDetails.contact} onChange={(e)=>setEditDetails({...editDetails,contact:e.target.value})} /></div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Address</h3><p>:</p></div>
                <div><input type="text" placeholder='Address' value={editDetails.street_address1} onChange={(e)=>setEditDetails({...editDetails,street_address1:e.target.value})} /></div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Other Address</h3><p>:</p></div>
                <div><input type="text" placeholder='Other Address' value={editDetails.street_address2} onChange={(e)=>setEditDetails({...editDetails,street_address2:e.target.value})} /></div>
            </div>
            <div className='info'>
                <div className='title' ><h3>City</h3><p>:</p></div>
                <div><input type="text" placeholder='City' value={editDetails.city} onChange={(e)=>setEditDetails({...editDetails,city:e.target.value})} /></div>
            </div>
            <div className='info'>
                <div className='title' ><h3>State</h3><p>:</p></div>
                <div><input type="text" placeholder='State' value={editDetails.state} onChange={(e)=>setEditDetails({...editDetails,state:e.target.value})} /></div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Pincode</h3><p>:</p></div>
                <div><input type="number" placeholder='Pincode' value={editDetails.pincode} onChange={(e)=>setEditDetails({...editDetails,pincode:e.target.value})} /></div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Country</h3><p>:</p></div>
                <div><input type="text" placeholder='Country' value={editDetails.country} onChange={(e)=>setEditDetails({...editDetails,country:e.target.value})} /></div>
            </div>
           
        </div>
    </div>
  )
}

export default UserProfileEdit
