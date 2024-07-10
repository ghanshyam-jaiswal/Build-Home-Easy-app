import React from 'react'
import '../css/landing.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const Landing = () => {

    const imageSlide = [
        {
          img: '/assets/home-logo.png'
        },
        {
          img: '/assets/home-logo.png'
        },
        {
          img: '/assets/home-logo.png'
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

  return (

    <div className='landing' >
      <h1>Landing</h1>
      <Slider {...settings}>
        {imageSlide.map((item, index) => (
          <div key={index} className="landing-hero">
            <img src={item.img} alt={`image${index + 1}`} />
          </div>
        ))}
      </Slider>

      {/* <div className="landing-item">

      </div> */}
  
    </div>
  )
}

export default Landing
