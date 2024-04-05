import Slider from "react-slick";
import SavingCard from "./SavingsCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* eslint-disable react/prop-types */
function SavingsCarousel({ savings, onCardChange, activeSaving }) {
  function PrevArrow({ onClick }) {
    return (
      <button
        className="font-semibold text-blue-500 absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={onClick}
      >
        <FaChevronLeft />
      </button>
    );
  }

  function NextArrow({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="font-semibold text-blue-500 absolute right-0 top-1/2 transform -translate-y-1/2"
      >
        <FaChevronRight />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {savings.map((saving) => (
          <div key={saving.id}>
            <SavingCard
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

export default SavingsCarousel;
