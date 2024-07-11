import React from 'react'

const AdminEditItem = () => {
  return (
    <div className="adminAddProduct">
    <h2>Edit Item</h2>
    <form action="" >
      <div className="productImage">
        <div className="labelImage">
          <label htmlFor="productImage">Image</label>
          <input
            type="file"
            id="productImage"
            // onChange={handleItemImage}
          />
        </div>
        {/* {itemImage && (
          <img
            src={itemImage}
            alt="img"
            style={{ height: "100%", width: "20%" }}
          />
        )} */}
      </div>

      <div className="productName">
        <input
          type="text"
          placeholder="Name"
        //   value={itemName}
        //   onChange={(e) =>setItemName( e.target.value ) }
        />
      </div>

      {/* <hr placeholder=""/> */}
      {/* <p className="child-item-text">Child Item</p> */}
     

      {/* <div className="productImage">
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
      </div> */}

      {/* <div className="productName">
        <input
          type="text"
          placeholder="Item Name"
          value={childItemDetails.childItemName}
          onChange={(e) =>setChildItemDetails({ ...childItemDetails, childItemName: e.target.value }) }
        />
      </div> */}

      {/* <div className="productName">
        <input
          type="number"
          placeholder="Item Price"
          value={childItemDetails.childItemPrice}
          onChange={(e) => setChildItemDetails({ ...childItemDetails, childItemPrice: e.target.value }) }
        />
      </div> */}

    
    </form>

    <div className='btns'>
          <button
            //   onClick={handleUpload}
              >Upload
          </button>
          <button 
            //   onClick={handleClear} 
              >Clear
          </button>
          <button onClick={()=>navigate('/admin/allItems')}>Cancel</button>
      </div>
  </div>
  )
}

export default AdminEditItem
