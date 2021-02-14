import React, { useMemo } from "react";
import { Play } from "../../interfaces/play";
import ReactApexChart from "react-apexcharts";
import { Player } from "../../interfaces/player";

interface HeatMapProps {
  plays: Play[];
}

export const HeatMap = (props: HeatMapProps) => {
  const { plays } = props;

  const series = useMemo(
    () => [
      {
        name: "0-100",
        data: plays
          .filter(p => p.pitch > 0 && p.pitch < 101)
          .map(fp => fp.pitch)
      },
      {
        name: "100-200",
        data: plays
          .filter(p => p.pitch > 99 && p.pitch < 201)
          .map(fp => fp.pitch)
      },
      {
        name: "200-300",
        data: plays
          .filter(p => p.pitch > 199 && p.pitch < 301)
          .map(fp => fp.pitch)
      },
      {
        name: "300-400",
        data: plays
          .filter(p => p.pitch > 299 && p.pitch < 401)
          .map(fp => fp.pitch)
      },
      {
        name: "400-500",
        data: plays
          .filter(p => p.pitch > 399 && p.pitch < 501)
          .map(fp => fp.pitch)
      },
      {
        name: "500-600",
        data: plays
          .filter(p => p.pitch > 499 && p.pitch < 601)
          .map(fp => fp.pitch)
      },
      {
        name: "600-700",
        data: plays
          .filter(p => p.pitch > 599 && p.pitch < 701)
          .map(fp => fp.pitch)
      },
      {
        name: "700-800",
        data: plays
          .filter(p => p.pitch > 699 && p.pitch < 801)
          .map(fp => fp.pitch)
      },
      {
        name: "800-900",
        data: plays
          .filter(p => p.pitch > 799 && p.pitch < 901)
          .map(fp => fp.pitch)
      },
      {
        name: "900-1000",
        data: plays
          .filter(p => p.pitch > 899 && p.pitch < 1001)
          .map(fp => fp.pitch)
      }
    ],
    [plays]
  );

  const options = useMemo(
    () => ({
      chart: {
        height: "100%",
        type: "heatmap",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
        text: "Pitches"
      }
    }),
    [plays]
  );

  console.log(series);

  return (
    <div>
      <ReactApexChart
        series={series}
        options={options}
        type="heatmap"
        height="100%"
      />
    </div>
  );
};
