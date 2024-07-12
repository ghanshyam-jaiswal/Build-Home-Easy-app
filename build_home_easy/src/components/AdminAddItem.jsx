import React, { useState } from "react";
import "../css/adminAddItem.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAddItem = () => {

    let [itemImage,setItemImg]=useState("")
    const [itemImageFile, setItemImageFile] = useState(null);
    let [itemName,setItemName]=useState('')

    let [childItemImage,setChildItemImg]=useState("")
    const [childItemImageFile, setChildItemImageFile] = useState(null);
    let [childItemDetails,setChildItemDetails]=useState({
        childItemName:'',
        childItemPrice:''
    })

    let navigate =useNavigate()

    let handleItemImage = (e) => {
        const file1 = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setItemImg(reader.result);
            setItemImageFile(file1);
          // setUserDetails({ ...userDetails, profile: reader.result });
        };
        if (file1) {
          reader.readAsDataURL(file1);
        }
      };

    let handleChildItemImage = (e) => {
        const file1 = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setChildItemImg(reader.result);
            setChildItemImageFile(file1);
          // setUserDetails({ ...userDetails, profile: reader.result });
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
      if(childItemImage===''|| childItemImage===null){
        proceed=false
        message+=' Item Image'
      }
      if(childItemDetails.childItemName===''|| childItemDetails.childItemName===null){
        proceed=false
        message+=' Item Name'
      }
      if(childItemDetails.childItemPrice===''|| childItemDetails.childItemPrice===null){
        proceed=false
        message+=' Price'
      }
      if(!proceed){
        // alert(message)
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
            name: itemName,
            image: itemImage,
            items: [
                {
                    itemName:childItemDetails.childItemName,
                    itemImage:childItemImage,
                    itemPrice:childItemDetails.childItemPrice
                }
            ]
          }
        }
        const response = await axios.post('http://localhost:5164/homeAddItem', payload);
          console.log("response",response)
          if(response.data.rData.rMessage==='Invalid product price'){
                  toast.error("Invalid Product Price")
          }
          if(response.data.rData.rMessage==='Duplicate Credentials'){
                  toast.error("Already Exists")
          }
          else if(response.data.rData.rMessage==='Added Successful'){
          // localStorage.removeItem('user')
          toast.success("Product Added Successful")
        //   navigate("/admin/allproducts")
        }
    }

    let handleClear=()=>{
        setChildItemDetails({
          childItemName:'',
          childItemPrice:'',
        })
        setItemImg('')
        setItemName('')
        setChildItemImg('')
    }

  return (
    <div className="adminAddProduct">
      <h2>Add Item</h2>
      <form action="" >
        <div className="productImage">
          <div className="labelImage">
            <label htmlFor="productImage">Image</label>
            <input
              type="file"
              id="productImage"
              onChange={handleItemImage}
            />
          </div>
          {itemImage && (
            <img
              src={itemImage}
              alt="img"
              style={{ height: "100%", width: "20%" }}
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

        {/* <hr placeholder=""/> */}
        <p className="child-item-text">Child Item</p>
       

        <div className="productImage">
          {/* <p>Child Item</p> */}
          <div className="labelImage">
            <label htmlFor="demoImage">Item Image</label>
            <input 
                type="file" 
                id="demoImage" 
                onChange={handleChildItemImage} 
            />
          </div>

          <div className="items">
            {childItemImage && (
                <img
                src={childItemImage}
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
            value={childItemDetails.childItemName}
            onChange={(e) =>setChildItemDetails({ ...childItemDetails, childItemName: e.target.value }) }
          />
        </div>

        <div className="productName">
          <input
            type="number"
            placeholder="Item Price"
            value={childItemDetails.childItemPrice}
            onChange={(e) => setChildItemDetails({ ...childItemDetails, childItemPrice: e.target.value }) }
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
            <button onClick={()=>navigate('/admin/allItems')}>Cancel</button>
        </div>
    </div>
  );
};

export default AdminAddItem;
