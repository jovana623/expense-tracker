import Slider from "react-slick";
import SavingsCard from "./SavingsCard";
import { getCurrencyEntity } from "../../helpers/currencyFunctions";
import CardSkeleton from "../../ui/CardSkeleton";

/* eslint-disable react/prop-types */
function VerticalCarousel({
  savings,
  onCardChange,
  activeSaving,
  currency,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[200px]">
        <div className="w-[90%]">
          <CardSkeleton />
        </div>
      </div>
    );
  }
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}  bg-blue-500  flex items-center justify-center rounded-full opacity-90 hover:bg-[#2574f5] hover:opacity-100`}
      ></div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className} bg-blue-500  flex items-center justify-center rounded-full opacity-90 hover:bg-[#2574f5] hover:opacity-100`}
      ></div>
    );
  };
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const formattedCurrency = getCurrencyEntity(currency);
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {savings.map((saving) => (
          <div key={saving.id}>
            <SavingsCard
              saving={saving}
              onCardChange={onCardChange}
              activeSaving={activeSaving}
              currency={formattedCurrency}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default VerticalCarousel;
