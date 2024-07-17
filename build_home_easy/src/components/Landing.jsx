import React, { useEffect, useState } from 'react'
import '../css/landing.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer';
import { SyncLoader} from 'react-spinners';



const Landing = ({list}) => {

    const imageSlide = [
        {
          img: '../assests/hero1.png'
        },
        {
          img: '../assests/hero1.2.png'
        },
        {
          img: '../assests/hero1.3.png'
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

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

  return (

    <div className='landing' >
      {
        list.length===0 ?  
          <div className='spinners'>
            <SyncLoader color="#36D7B7" list={list} size={20} />
          </div>
           : 
          <>
      
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

            <div className="landing-back-to-top" onClick={scrollToTop}>Back-to-top</div>

            <Footer/>
          </> 
      }
    </div>
  )
}

export default Landing
