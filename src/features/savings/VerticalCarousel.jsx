import Slider from "react-slick";
import SavingsCard from "./SavingsCard";

/* eslint-disable react/prop-types */
function VerticalCarousel({ savings, onCardChange, activeSaving }) {
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
    <div className="slider-container">
      <Slider {...settings}>
        {savings.map((saving) => (
          <div key={saving.id}>
            <SavingsCard
              saving={saving}
              onCardChange={onCardChange}
              activeSaving={activeSaving}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default VerticalCarousel;
