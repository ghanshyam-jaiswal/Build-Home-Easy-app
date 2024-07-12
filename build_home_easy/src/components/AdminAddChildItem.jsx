import React, { useState } from 'react'
import "../css/adminAddChildItem.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        if(itemName===''|| itemName===null){
          proceed=false
          message+=' Name'
          
        }
        if(itemPrice===''|| itemPrice===null){
          proceed=false
          message+=' Price'
        }
        if(!proceed){
          // alert(message)
          toast.info(message)
        }
        return proceed
    }

    let  handleUpload = (e)=>{
        // console.log("details",itemName,itemPrice,itemImage)
        e.preventDefault()
        if (!isValidate()) return;
        
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
