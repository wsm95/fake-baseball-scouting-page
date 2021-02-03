import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { Play } from "../../interfaces/play";

interface LineGraphProps {
  plays: Play[];
}

export const LineGraph = (props: LineGraphProps) => {
  const { plays } = props;

  const options = useMemo(
    () => ({
      chart: {
        id: "line",
        zoom: {
          enabled: false
        },
        redrawOnParentResize: false
      },
      xaxis: {
        categories: [...Array(plays.length).keys()].map(x => ++x)
      },
      markers: {
        size: 5,
        showNullDataPoints: false
      }
    }),
    [plays]
  );

  const series = useMemo(
    () => [
      {
        name: "pitches",
        data: plays.map((play: Play) => play.pitch)
      }
    ],
    [plays]
  );

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="100%"
    />
  );
};
