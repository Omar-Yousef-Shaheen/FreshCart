import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

function CategorySlider() {
  function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("GetCategorg", getCategory);

  if (isLoading) {
    return <Loading />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.data.data.map((category, index) => {
          return (
            <div className="w-100" key={index}>
              <img
                style={{ height: "230px" }}
                className="w-100"
                src={category.image}
                alt={category.name}
              />
              <h5 className=" text-center text-muted fw-bold bg-light">

                {category.name}
              </h5>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default CategorySlider;
