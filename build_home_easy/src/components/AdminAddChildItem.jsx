import React, { useState } from 'react'
import "../css/adminAddChildItem.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const adminAddChildItem = () => {

    let {item}=useLocation().state

    let [itemImage,setItemImg]=useState("")
    let [itemName,setItemName]=useState('')
    let [itemPrice,setItemPrice]=useState('')

    let navigate =useNavigate()

    let handleItemImage = (e) => {
        const file1 = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setItemImg(reader.result);
        };
        if (file1) {
          reader.readAsDataURL(file1);
        }
      };

    let isValidate=()=>{

        let proceed=true
        let message='Enter';
    
        if(itemImage===''|| itemImage===null){
          proceed=false
          message+=' Image'
          
        }
        else if(itemName===''|| itemName===null){
          proceed=false
          message+=' Name'
          
        }
        else if(itemPrice===''|| itemPrice===null){
          proceed=false
          message+=' Price'
        }
        if(!proceed){
          // alert(message)
          toast.info(message)
        }
        return proceed
    }

    let  handleUpload = async (e)=>{
        e.preventDefault()
        if (!isValidate()) return;
        // console.log("details",itemName,itemPrice,itemImage)
        let payload={
          eventID: "1001",
          addInfo: {
            itemId:item.id,
            image:itemImage,
            name: itemName,
            price:itemPrice
           }}
          //  console.log("payload3",payload3)
        const response = await axios.post('http://localhost:5164/homeAddChildItem',payload);
        console.log("response",response)
        if(response.data.rData.rMessage==='Duplicate Credentials'){
                toast.error("Already Exists Child Item")
        }
        else if(response.data.rData.rMessage==='Added Successful'){
            // let selectedId=response2.data.rData.users[0].id
            toast.success("Added Successful")
            navigate('/admin/viewItem',{state:{item}})
        }

        
    }

    let handleClear=()=>{
        setItemImg('')
        setItemName('')
        setItemPrice('')
    }

  return (
    <div className="adminAddChildItem">
      <h2>Add Child Item</h2>
      <form action="" >
      
        <div className="productImage">
          {/* <p>Child Item</p> */}
          <div className="labelImage">
            <label htmlFor="demoImage">Item Image</label>
            <input 
                type="file" 
                id="demoImage" 
                onChange={handleItemImage} 
            />
          </div>

          <div className="items">
            {itemImage && (
                <img
                src={itemImage}
                alt="img"
                style={{ height: "100%", width: "20%" }}
                />
            )}
          </div>
        </div>

        <div className="productName">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) =>setItemName(e.target.value ) }
          />
        </div>

        <div className="productName">
          <input
            type="number"
            placeholder="Item Price"
            value={itemPrice}
            onChange={(e) => setItemPrice( e.target.value ) }
          />
        </div>

      
      </form>
      <div className='btns'>
            <button
                onClick={handleUpload}
                >Upload
            </button>
            <button 
                onClick={handleClear} 
                >Clear
            </button>
            <button 
                onClick={()=>navigate('/admin/viewItem',{state:{item}})}
                >Cancel
            </button>
        </div>
    </div>
  )
}

export default adminAddChildItem
