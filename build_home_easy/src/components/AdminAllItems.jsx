import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../css/adminAllItems.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AdminAllItems = () => {

    let navigate =useNavigate()

    let [list,setList]=useState([])

    useEffect(() => {
      fetchProducts();
    }, []);
  
    useEffect(()=>{
      console.log("AllItem List updated",list)
    },[list])

    let fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:5164/homeGetAllItems', {
          eventID: "1001",
          addInfo: {}
        });
  
        if (response.data.rData.rMessage === 'Successful') {
          setList(response.data.rData.users);
          // console.log("Fetched product List successfully");
          // console.log("product List ",list);
  
        } else {
          console.log("Failed to fetch  Product List");
        }
      } catch (error) {
        console.error("Error fetching Product List:", error);
      }
    };

    let handleDeleteItem = async (dataToBeDelete)=> {
        let confirm=window.confirm("Are You Sure")
        if(confirm){
          let payload={
            eventID: "1001",
            addInfo: {
              id: dataToBeDelete,
            }
          }
          const response = await axios.post('http://localhost:5164/homeDeleteItem', payload);
          console.log(response)
          if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
            toast.error("Failed")
          }
          else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
          // localStorage.removeItem('user')
          // toast.success("Delete Successful")
        //   console.log("deleted successful")
          toast.success("Deleted Successful")
          fetchProducts();
          // navigate("/")
          }
        }
      }

  return (
    <div className='adminAllProducts'>
       <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Product Image</th>
                <th>Name</th>
                {/* <th>Price</th>
                <th>Demo Images</th>
                <th>Demo Text</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {list.map((product,index) => (
                  <tr key={index}>
                      <td>{product.id}</td>
                      {/* <td><img src={product.productImage} alt="image" className='profile' style={{width:'30%',height:'10%',border:'1px solid'}}/></td> */}
                      <td><img src={product.image} alt="image" className='profile'/></td>
                      <td>{product.name}</td>
                      {/* <td>Rs. {product.productPrice}</td> */}
                      {/* <td>{product.product || '--'}</td> */}
                      {/* <td>{user.productDemoImages || '--'}</td> */}
                      {/* <td> 
                        {product.productDemoImages && Array.isArray(JSON.parse(product.productDemoImages)) ? (
                          <div className="imageList">
                            {JSON.parse(product.productDemoImages).map((imageData, idx) => (
                              <img key={idx} src={imageData} alt={`demo ${idx}`} style={{ width: '44%', height: '44%' ,boxShadow:'0 0 2px'}} />
                            ))}
                          </div>
                          ) : ('--')
                        }
                      </td> */}
                      {/* <td> 
                        {product.productDemoText && Array.isArray(JSON.parse(product.productDemoText)) ? (
                          <ul style={{listStyle: 'none'}}>
                            {JSON.parse(product.productDemoText).map((item, idx) => (
                              <li key={idx} >{item}</li>
                            ))}
                          </ul>
                          ) : ('--')
                        }
                      </td> */}
                      <td>
                        <div className='action'>
                          {/* <button onClick={()=>navigate(`/admin/updateproduct/${product.id}`)} className='delete-btn update'>Update <BiEdit style={{fontSize:'1vw'}} /></button> */}
                          <button onClick={()=>navigate(`/admin/updateproduct/${product.id}`)} className='view-btn'>View</button>
                          <button onClick={()=>navigate("/admin/editItem")} className='edit-btn'>Edit</button>
                          {/* <button className='delete-btn' onClick={()=>handleDeleteProduct(product.id)} >Delete <MdDeleteForever style={{fontSize:'1.1vw'}}/></button> */}
                          <button onClick={()=>handleDeleteItem(product.id)} className='delete-btn'  >Delete</button>
                        </div>
                      </td>
                      {/* <td><button onClick={()=>handleDeleteUser(user.user_id)} className='delete-btn'>Delete</button></td> */}
                    </tr>
                ))
                }
             </tbody>
          
          </table>
        </div>
        <div className='addProduct' >
          <button onClick={()=>navigate("/admin/addItem")}>Add New Item</button>
          {/* <Link to={'/admin/addproduct'}>Add New Product</Link> */}
        </div>

    </div>
  )
}

export default AdminAllItems
