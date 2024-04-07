import Slider from "react-slick";
import SavingCard from "./SavingsCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

/* eslint-disable react/prop-types */
function SavingsCarousel({ savings, onCardChange, activeSaving }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  function PrevArrow({ onClick }) {
    return (
      <button
        className="font-semibold text-blue-500 absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={() => {
          onClick();
          setCurrentSlide(currentSlide - 1);
        }}
      >
        <FaChevronLeft />
      </button>
    );
  }

  function NextArrow({ onClick }) {
    return (
      <button
        onClick={() => {
          onClick();
          setCurrentSlide(currentSlide + 1);
        }}
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
    initialSlide: currentSlide,

    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };

  // Check if savings is defined and is an array before mapping over it
  if (!Array.isArray(savings)) {
    return null; // or return loading indicator, error message, etc. depending on your requirements
  }

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
