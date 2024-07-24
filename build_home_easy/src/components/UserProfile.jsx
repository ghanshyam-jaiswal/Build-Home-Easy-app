import React, { useEffect } from 'react'
import "../css/userProfile.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UserProfile = ({userDetails}) => {
    // console.log("profile",userDetails)
    let navigate=useNavigate()

    useEffect(()=>{
        let user=localStorage.getItem('user')
        if(user===null || user===''){
          navigate('/login')
        }
    },[navigate])

    let handleDeleteUser = async (dataToBeDelete)=> {
        let confirm=window.confirm("Do you want permanent")
        if(confirm){
        let payload={
            eventID: "1001",
            addInfo: {
            id: dataToBeDelete,
            }
        }
        //   console.log("payload",payload)
        const response = await axios.post('http://localhost:5164/homeDeleteUser', payload);
        //   console.log(response)
        if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
            toast.error("Failed")
        }
        else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
            toast.success("Deleted Successful")
            localStorage.removeItem('user')
            navigate('/login')
        }
    }
  }


  return (
    <div className='userProfile'>
        <div className="edit">
            <button onClick={()=>handleDeleteUser(userDetails.id)}>Delete Account</button>
            <button onClick={()=>{navigate('/profileEdit',{state:{userDetails}})}}>+ Edit Profile</button>
        </div>
        <div className="profile">
           <img src={`${userDetails.profile || '../assests/user-profile-logo-img.jpg'}`} alt="img" />
           <h1>{userDetails.first_name} {userDetails.last_name}</h1>
        </div>
        <div className="details">
            <div className='info'>
                <div className='title' ><h3>Gender</h3><p>:</p></div>
                <div>{userDetails.gender || '--'}</div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Email</h3><p>:</p></div>
                <div>{userDetails.email || '--' }</div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Password</h3><p>:</p></div>
                <div>{userDetails.password || '--' }</div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Contact</h3><p>:</p></div>
                <div>{userDetails.contact || '--' }</div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Address</h3><p>:</p></div>
                <div>{userDetails.street_address1 || '--' }</div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Other Address</h3><p>:</p></div>
                <div>{userDetails.street_address2 || '--' }</div>
            </div>
            <div className='info'>
                <div className='title' ><h3>City</h3><p>:</p></div>
                <div>{userDetails.city || '--' }</div>
            </div>
            <div className='info'>
                <div className='title' ><h3>State</h3><p>:</p></div>
                <div>{userDetails.state || '--' }</div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Pincode</h3><p>:</p></div>
                <div>{userDetails.pincode || '--' }</div>
            </div>
            <div className='info'>
                <div className='title' ><h3>Country</h3><p>:</p></div>
                <div>{userDetails.country || '--' }</div>
            </div>
           
        </div>
    </div>
  )
}

export default UserProfile
