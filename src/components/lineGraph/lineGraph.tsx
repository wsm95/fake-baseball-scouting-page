import React, { useMemo } from "react";
import { Chart } from "react-charts";
import { Play } from "../../interfaces/play";

interface LineGraphProps {
  plays: Play[];
}

export const LineGraph = (props: LineGraphProps) => {
  const { plays } = props;

  const data = useMemo(
    () => [
      {
        label: "Pitches",
        data: plays.map((play: Play, index: number) => ({
          primary: index,
          secondary: play.pitch
        }))
      }
    ],
    [plays]
  );

  const series = useMemo(
    () => ({
      showPoints: true
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );
  return (
    <div
      style={{
        width: "400px",
        height: "300px",
        marginLeft: 16
      }}
    >
      <Chart data={data} series={series} axes={axes} tooltip />
    </div>
  );
};
