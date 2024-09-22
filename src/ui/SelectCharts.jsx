/* eslint-disable react/prop-types */
function SelectCharts({ onSetChart }) {
  function handleChange(e) {
    onSetChart(e.target.value);
  }
  return (
    <select onClick={handleChange} className="outline-none">
      <option value="bar">Bar Chart</option>
      <option value="line">Line chart</option>
    </select>
  );
}

export default SelectCharts;
