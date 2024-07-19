import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "../css/item.css"
import axios from 'axios';

const Item = () => {

    const {item} = useLocation().state;
    let [itemDetails,setItemDetails]=useState([])

    useEffect(()=>{
        console.log("itemDetails2 ",itemDetails);
    },[itemDetails])

    useEffect(() => {
        fetchProducts(); 
    }, []);
    
    let fetchProducts = async () => {
        try {
          const response = await axios.post('http://localhost:5164/homeGetAllChildItemsById', {
            eventID: "1001",
            addInfo: {
                itemId:item.id
            }
          });
    
          if (response.data.rData.rMessage === 'Successful') {
            setItemDetails(response.data.rData.users);
            // console.log("Fetched productDetails successfully");
            console.log("itemDetails ",itemDetails);
    
          } else {
            console.log("Failed to fetch users");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
    };

  return (
    <div className='item'>
       <div className='parentDetails'>
            <img src={item.image} alt="" />
            <h2>{item.name}</h2>
        </div>

        {
            itemDetails.map((childItem,childIndex)=>(
                    <div key={childIndex} className='childDetails'>
                        <img src={childItem.image} alt="img" />
                        {/* <div className='info'>
                            <div className='name' ></div>
                            <div className='price' ></div>
                            <div className='quantitiyBuy' > </div>
                        </div> */}
                    </div>
            ))
        }
       
     
    </div>
  )
}

export default Item
