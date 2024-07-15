import React, { useEffect, useState } from 'react'
import "../css/adminEditItem.css"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';


const AdminEditItem = () => {

  let {details}=useLocation().state
  // console.log("AdminEditItem",details)
  let navigate=useNavigate()

  let [itemImage,setItemImg]=useState("")
  let [itemName,setItemName]=useState('')

  useEffect(()=>{
    // console.log("AdminEditItem",details)
    setItemImg(details.image)
    setItemName(details.name)
    // console.log("selected",itemImage,itemName)
  },[details])

  const handleItemImage = (e) => {
    // e.preventDefault()
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setItemImg(reader.result);
        };
        reader.readAsDataURL(file);
    }
  };

  let isValidate=()=>{

    let proceed=true
    let message='Enter';

    if(itemImage===''|| itemImage===null){
      proceed=false
      message+=' Image'
      
    }
    if(itemName===''|| itemName===null){
      proceed=false
      message+=' Name'
      
    }
    if(!proceed){
      toast.info(message)
    }
    return proceed
  }

  let handleUpload= async (e)=>{
    e.preventDefault()
    if (!isValidate()) return;
    // console.log("details",details)
    let payload={
      eventID: "1001",
      addInfo: {
        id:details.id,
        name: itemName,
        image: itemImage,
      }
    }
    console.log("payload",payload)
    const response = await axios.post('http://localhost:5164/homeUpdateItemById', payload);
      // console.log("response",response)
      if(response.data.rData.rMessage==='Duplicate Credentials'){
          toast.error("Already Exists")
      }
      else if(response.data.rData.rMessage==='UPDATE SUCCESSFULLY'){
      // localStorage.removeItem('user')
      toast.success("Product Added Successful")
      navigate("/admin/allItems")
    }
  }

  return (
    <div className="adminEditItem">
    <h2>Edit Item</h2>
    <form action="" onSubmit={(e)=>e.preventDefault()}>
      <div className="productImage">
        <div className="labelImage">
          <label htmlFor="productImage">Image</label>
          <input
            type="file"
            id="productImage"
            onChange={handleItemImage}
          />
        </div>
       
      </div>

      <div className='image'>
        {itemImage && (
            <img
              src={itemImage}
              alt="img"
              style={{ height: "100%", width: "30%" }}
            />
          )}
      </div>
       
      <div className="productName">
        <input
          type="text"
          placeholder="Name"
          value={itemName}
          onChange={(e) =>setItemName( e.target.value ) }
        />
      </div>

    </form>

    <div className='btns'>
          <button
              onClick={handleUpload}
              >Upload
          </button>
          <button onClick={()=>navigate('/admin/allItems')}>Cancel</button>
      </div>
  </div>
  )
}

export default AdminEditItem
