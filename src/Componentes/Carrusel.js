import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../css/Carrusel.css"
const Carrusel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings} style={{background: 'linear-gradient(90deg, #d6f1ff, #d6f1ff, white)' }} >
      <div >
        <img className='img-rize' src="./carrusel1.png" alt="Imagen 1" />
      </div>
      <div >
        <img className='img-rize' src="./carrusel2.png" alt="Imagen 2" />
      </div>
      <div >
        <img className='img-rize' src="./carrusel3.png" alt="Imagen 3" />
      </div>
      <div > 
        <img className='img-rize' src="./carrusel4.png" alt="Imagen 3" />
      </div>
    </Slider>
  );
};

export default Carrusel;