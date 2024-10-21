/* eslint-disable react/prop-types */
function Select({ data, onChange }) {
  return (
    <select onChange={onChange} className="outline-none">
      {data.map((item) => (
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
