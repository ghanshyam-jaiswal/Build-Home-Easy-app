import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../css/adminEditChildItem.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminEditChildItem = () => {

    let {item2,item}=useLocation().state
    // console.log("item,item2",item,item2)
    let [details,setDetails]=useState({
        image:'',
        name:'',
        price:''
    })

    let navigate=useNavigate()

  useEffect(()=>{
    // console.log("AdminEditItem",details)
    setDetails({
        ...details,
        image:item2.image,
        name:item2.name,
        price:item2.price
    })
    // console.log("selected",itemImage,itemName)
  },[item,item2])

  const handleItemImage = (e) => {
    // e.preventDefault()
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDetails({...details,image:reader.result});
        };
        reader.readAsDataURL(file);
    }
  };

    let isValidate=()=>{

        let proceed=true
        let message='Enter';

        if(details.image===''|| details.image===null){
        proceed=false
        message+=' Image'
        
        }
        else if(details.name===''|| details.name===null){
        proceed=false
        message+=' Name'
        
        }
        else if(details.price===''|| details.price===null){
        proceed=false
        message+=' Price'
        
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
                id:item2.id,
                image: details.image,
                name: details.name,
                price:details.price
                
            }
        }
        console.log("payload",payload)
        const response = await axios.post('http://localhost:5164/homeUpdateChildItemById', payload);
            // console.log("response",response)
        if(response.data.rData.rMessage==='Duplicate Credentials'){
            toast.error("Already Exists")
        }
        else if(response.data.rData.rMessage==='UPDATE SUCCESSFULLY'){
            // localStorage.removeItem('user')
            toast.success("Product Added Successful")
            navigate('/admin/viewItem',{state:{item}})
        }
    }

  return (
    <div className="adminEditChildItem">
    <h2>Edit Child Item</h2>
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
        {details.image && (
            <img
              src={details.image}
              alt="img"
              style={{ height: "100%", width: "30%" }}
            />
          )}
      </div>
       
      <div className="productName">
        <input
          type="text"
          placeholder="Name"
          value={details.name}
          onChange={(e) =>setDetails({...details,name:e.target.value}) }
        />
      </div>

      <div className="productName">
        <input
          type="number"
          placeholder="Price"
          value={details.price}
          onChange={(e) =>setDetails({...details,price:e.target.value}) }
        />
      </div>

    </form>

    <div className='btns'>
          <button
              onClick={handleUpload}
              >Upload
          </button>
          <button onClick={()=>navigate('/admin/viewItem',{state:{item}})}>Cancel</button>
      </div>
  </div>
  )
}

export default AdminEditChildItem
