/* eslint-disable react/prop-types */
function SelectType({ data, onChange }) {
  return (
    <select onChange={onChange} className="outline-none">
      {data.map((item) => (
        <option value={item.type} key={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default SelectType;
