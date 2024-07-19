import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import "../css/adminContact.css"
import { MdDeleteForever } from "react-icons/md";


const AdminContact = () => {

  let [userDetails,setUserDetails]=useState([])

  let fetchUsers = async () => {
    try {
      const response = await axios.post('http://localhost:5164/homeGetAllContact', {
        eventID: "1001",
        addInfo: {}
      });
      if (response.data.rData.rMessage === 'Successful') {
        setUserDetails(response.data.rData.users);
        console.log("Fetched users successfully");
        console.log("userDetails ",userDetails);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

useEffect(() => {
    fetchUsers(); 
}, []);

useEffect(()=>{
  console.log("userDetails updated",userDetails)
},[userDetails])


let handleDeleteContact = async (dataToBeDelete)=> {
  let confirm=window.confirm("Are You Sure")
  if(confirm){
    let payload={
      eventID: "1001",
      addInfo: {
        id: dataToBeDelete,
      }
    }
    const response = await axios.post('http://localhost:5164/homeDeleteContact', payload);
    console.log(response)
    if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
        toast.error("Failed")
    }
    else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
      console.log("deleted successful")
      toast.success("Deleted Successful")
      fetchUsers();
    }
  }
  
}

  return (
    <div className='adminContact'>
       <div className='adminContactTableContainer'>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Date-Time</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {userDetails.map((user,index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.dateAndTime || '--'}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="message-cell" >{user.message || '--'}</td>
                        <td>
                          <div className='action'>
                            <button onClick={()=>handleDeleteContact(user.id)} className='delete-btn'>Delete <MdDeleteForever style={{fontSize:'1.2vw',}} /></button>
                          </div>
                        </td>
                    </tr>
                  ))
                }
             </tbody>
          
          </table>
        </div>

    </div>
  )
}

export default AdminContact
