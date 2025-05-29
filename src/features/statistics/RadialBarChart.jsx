import ReactApexChart from "react-apexcharts";

/* eslint-disable react/prop-types */
function RadialBarChartComponent({ data }) {
  const series = data.map((item) => item.percentage);
  const labels = data.map((item) => item.name);
  const colors = data.map((item) => item.fill);

  const options = {
    chart: {
      height: 200,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "20%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    labels: labels,
    colors: colors,
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={270}
      />
    </div>
  );
}

export default RadialBarChartComponent;
