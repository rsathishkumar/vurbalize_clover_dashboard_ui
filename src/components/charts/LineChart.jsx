import { useEffect } from "react";
import Chart from "react-apexcharts";

const LineChart = (props) => {

  return (
    <>
      <Chart
        options={props.series.options}
        type="line"
        width="100%"
        height="100%"
        series={props.series.series}
      />
    </>
  );
};

export default LineChart;
