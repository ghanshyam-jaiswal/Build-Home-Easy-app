import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../css/item.css"
import axios from 'axios';
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import {toast} from 'react-toastify'


const Item = () => {

    const {item} = useLocation().state;
    let [itemDetails,setItemDetails]=useState([])
    const [quantities, setQuantities] = useState([]);

    let navigate=useNavigate()

    useEffect(()=>{
      let user=localStorage.getItem('user')
      if(user===null || user===''){
        navigate('/login')
      }
    },[navigate])

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
            // console.log("response",response.data.rData.users);
            setQuantities(response.data.rData.users.map(user => user.minQuantity));
            // console.log("Fetched productDetails successfully");
            console.log("itemDetails ",itemDetails);
    
          } else {
            console.log("Failed to fetch users");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
    };

    const handleQuantityChange = (index, delta) => {
      setQuantities(prevQuantities => {
        const newQuantities = [...prevQuantities];
        const newQuantity = Number(newQuantities[index]) + delta;
        newQuantities[index] = Math.max(itemDetails[index].minQuantity, newQuantity);
        return newQuantities;
      });
    };

    const handleInputChange = (index, value) => {
        const parsedValue = Number(value);
        setQuantities(prevQuantities => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = parsedValue;
        return newQuantities;
      });
    };

    let handleBuy=(index,childItem)=>{
      if (quantities[index] < itemDetails[index].minQuantity) {
        // alert(`Quantity for ${itemDetails[index].name} cannot be less than ${itemDetails[index].minQuantity}`);
        toast.warn(`Quantity for ${itemDetails[index].name} cannot be less than ${itemDetails[index].minQuantity}`);
      } else {
        // console.log("quantities",quantities)
        // console.log("Quantity", quantities[index]);
        // console.log("Total Price", quantities[index]*itemDetails[index].price);
        // console.log("Item",item)
        navigate('/payment',{state:{
          item,
          childItem,
          totalPrice:quantities[index]*itemDetails[index].price,
          quantity: quantities[index]
        }})
      }
    }

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
                        <div className='info'>
                            <div className='name' >{childItem.name}</div>
                            <div className='price' >
                              <RiMoneyRupeeCircleFill color='green' fontSize={'1.4vw'}/> 
                              <h2 style={{fontSize:'1.5vw',marginRight:'1%',marginLeft:'1%'}}>{childItem.price}</h2>
                              <p style={{fontSize:'1vw'}}>-/{childItem.perItem}</p> 
                            </div>
                              <div className='quantity'>
                                <div>
                                  <button onClick={() => handleQuantityChange(childIndex, -1)} className='btn-decre' >-</button>
                                  <input type="number" value={quantities[childIndex]}  onChange={(e) => handleInputChange(childIndex, e.target.value)}/>
                                  <button onClick={() => handleQuantityChange(childIndex, 1)} className='btn-incre' >+</button>
                                </div>
                                <p>Quantity</p>
                              </div>
                           
                        </div>
                        <div className='buy'>
                          {/* <div> */}
                            <p style={{fontSize:'1vw'}} >Total Price</p>
                            <h1 style={{fontSize:'1.6vw'}}>{`${quantities[childIndex]*itemDetails[childIndex].price}.00`}</h1>
                          {/* </div> */}
                          <button onClick={() => handleBuy(childIndex,childItem)} style={{fontSize:'0.9vw'}}>Buy</button>
                        </div>
                </div>
            ))
        }
       
     
    </div>
  )
}

export default Item
