import Slider from "react-slick";
import SavingCard from "./SavingsCard";

/* eslint-disable react/prop-types */
function SavingsCarousel({ savings }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,

    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };

  return (
    <div className="">
      <Slider {...settings}>
        {savings.map((saving) => (
          <div key={saving.id}>
            <SavingCard saving={saving} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SavingsCarousel;
