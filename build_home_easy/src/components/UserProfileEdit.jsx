import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../css/userProfileEdit.css"
import { toast } from 'react-toastify'
import axios from 'axios'

const UserProfileEdit = () => {
    let {userDetails}=useLocation().state
    let navigate=useNavigate()
    // console.log("profileEdit",userDetails.profile)

    const fileInputRef = useRef(null);

    let [userImage,setUserImg]=useState("")
    const [file, setFile] = useState(null);

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
            city:userDetails.city,
            state:userDetails.state,
            pincode:userDetails.pincode,
            country:userDetails.country,
            profile:userDetails.profile
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
        country:'',
        profile:''
    })

    // useEffect(()=>{

    // },[userImage,editDetails,userDetails])

    let handleImage = (e) => {
        const file2 = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserImg(reader.result);
          setFile(file2);
          setEditDetails({ ...editDetails, profile: reader.result });
        };
        if (file2) {
          reader.readAsDataURL(file2);
        }
      };

    const handleDivClick = () => {
        fileInputRef.current.click(); // Trigger file input click event
      };

    let isValidate=()=>{
        let proceed=true
        let message='Enter';
        if(editDetails.first_name===''|| editDetails.first_name===null){
          proceed=false
          message+=' Name'
        }
        else if(editDetails.email===''|| editDetails.email===null){
          proceed=false
          message+=' Email'
        }
        else if(editDetails.password===''|| editDetails.password===null){
          proceed=false
          message+=' Password'
        }
        if(!proceed){
          toast.info(message)
        }
        return proceed
    }

    let handleSave= async ()=>{
        let payload={
            eventID: "1001",
            addInfo: {
                id: userDetails.id,
                first_name: editDetails.first_name,
                last_name: editDetails.last_name,
                gender: editDetails.gender,
                email: editDetails.email,
                password: editDetails.password,
                contact: editDetails.contact,
                street_address1: editDetails.street_address1,
                street_address2: editDetails.street_address2,
                city: editDetails.city,
                state: editDetails.state,
                pincode: editDetails.pincode,
                country: editDetails.country,
                profile: userImage || editDetails.profile,
            }
        }

        if (!isValidate()) return;
        console.log('handleSave',payload)
        try {
                const response = await axios.post('http://localhost:5164/homeUpdateUserById', payload);
                console.log(response)
                if(response.data.rData.rMessage==='No rows affected. Update failed.'){
                    toast.error("No rows affected")
                }
                else if(response.data.rData.rMessage==='UPDATE SUCCESSFULLY.'){
                    // console.log('Updated Successfully');
                    // toast.success('Updated Successfully');
                    try{
                        const response2 = await axios.post('http://localhost:5164/homeGetUserByEmail', {
                                eventID: "1001",
                                addInfo: {
                                    email: editDetails.email  // Assuming userId is passed as prop to UserProfile
                                }
                            });
                        // localStorage.setItem('user',response2.data.rData.users[0].email);
                        localStorage.setItem('user',editDetails.email);
                    } 
                    catch (error)
                    {
                        toast.error(error.message);
                    }
                    toast.success('Updated Successfully');
                    navigate('/');
                }
        } 
        catch(error){
            console.error('Error Update:', error);
            toast.error('An error occurred during Update',error);
        }
    }


  return (
    <div className='userProfileEdit'>
        <div className="edit">
            <button onClick={handleSave}>Save</button>
            <button onClick={()=>{navigate('/profile')}}>Cancel</button>
        </div>
        <div className="profile">
            <div onClick={handleDivClick} style={{backgroundImage: userImage?`url(${userImage})` : `url(${userDetails.profile || '../assests/user-profile-logo-img.jpg'})` }}>
            {/* <div onClick={handleDivClick} style={{backgroundImage: userDetails.profile?`url(${userDetails.profile})` : `url('../assests/user-profile-logo-img.jpg')` }}> */}
                <input type="file"  ref={fileInputRef} onChange={handleImage} style={{display:'none'}} />
                <p style={{fontSize:'0.9vw'}}>Edit</p>
            </div>
            <input type="text" placeholder='First Name' value={editDetails.first_name} onChange={(e)=>setEditDetails({...editDetails,first_name:e.target.value})}  style={{marginRight:'1%'}}/> 
            <input type="text" placeholder='Last Name' value={editDetails.last_name} onChange={(e)=>setEditDetails({...editDetails,last_name:e.target.value})} />
        </div>
        <div className="details">
            <div className='info'>
                <div className='title' ><h3>Gender</h3><p>:</p></div>
                <div>
                    {/* <input type="text" value={editDetails.gender} /> */}
                    <select 
                        value={editDetails.gender}
                        onChange={(e)=>setEditDetails({...editDetails,gender:e.target.value})}
                    >
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
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
