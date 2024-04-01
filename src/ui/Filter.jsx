import { useSearchParams } from "react-router-dom";
import FilterContainer from "./FilterContainer";
import FilterButton from "./FilterButton";

/* eslint-disable react/prop-types */
function Filter({ field, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value) {
    searchParams.set(field, value);
    setSearchParams(searchParams);
  }

  const currentValue = searchParams.get(field) || options[2].value;

  return (
    <FilterContainer>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          isActive={option.value === currentValue}
        >
          {option.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
}

export default Filter;
