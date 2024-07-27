import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderOne from "../../images/slider-image-1.jpeg"
import sliderTwo from "../../images/slider-image-2.jpeg"
import sliderThree from "../../images/grocery-banner-2.jpeg"
import sliderFour from "../../images/blog-img-2.jpeg"


function AutoPlay() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear",

    
  };
  return (
    <div className="slider-container ">
      <Slider {...settings}>
        <div>
          <img
            style={{ height: "300px" }}
            className="w-100"
            src={sliderOne}
            alt="Imag-Banner"
          />
        </div>
        <div>
          <img
            style={{ height: "300px" }}
            className="w-100"
            src={sliderTwo}
            alt="Imag-Banner"
          />
        </div>
        <div>
          <img
            style={{ height: "300px" }}
            className="w-100"
            src={sliderThree}
            alt="Imag-Banner"
          />
        </div>
        <div>
          <img
            style={{ height: "300px" }}
            className="w-100"
            src={sliderFour}
            alt="Imag-Banner"
          />
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
