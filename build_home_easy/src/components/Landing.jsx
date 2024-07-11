import React, { useEffect, useState } from 'react'
import '../css/landing.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'



const Landing = () => {

    const imageSlide = [
        {
          img: '../assests/home-logo.png'
        },
        {
          img: '../assests/home-logo.png'
        },
        {
          img: '../assests/home-logo.png'
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    let [list,setList]=useState([])

    useEffect(() => {
      fetchProducts();
    }, []);
  
    useEffect(()=>{
      console.log("Product List updated",list)
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
  

  return (

    <div className='landing' >
      {/* <h1>Landing</h1> */}
      <Slider {...settings}>
        {imageSlide.map((item, index) => (
          <div key={index} className="landing-hero">
            <img src={item.img} alt={`image${index + 1}`} />
          </div>
        ))}
      </Slider>

      <div className="landing-item">
      {
          list.map((item)=>(

                <div key={item.id} className="landing-item-items">
                  <Link  to={`/card/${item.name}`} style={{textDecoration:"none"}}>
                    {/* <div className="landing-item-img" style={{backgroundImage:'url("../Assests/alarm\ watch.jpg")'}}></div> */}
                    <img src={item.image} alt="" className="landing-item-img" />
                    {/* <div className="landing-item-text">Alarm</div> */}
                    <div className="landing-item-text">{item.name}</div>
                  </Link>
                </div>
          ))
        }
      </div>
  
    </div>
  )
}

export default Landing
