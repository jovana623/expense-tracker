/* eslint-disable react/prop-types */
function SelectType({ data, onChange, isLoading }) {
  if (isLoading) return <div></div>;
  return (
    <select
      onChange={onChange}
      className="outline-none bg-lightBg text-gray-700 rounded-md px-4 py-1 focus:ring-1 focus:ring-blue-300 focus:outline-none 
      dark:bg-gray-700 dark:text-lightBg"
    >
      {data.map((item) => (
        <option value={item.type} key={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default SelectType;
