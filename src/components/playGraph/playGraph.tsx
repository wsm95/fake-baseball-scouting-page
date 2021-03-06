import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { Play } from "../../interfaces/play";

interface PlayGraphProps {
  plays: Play[];
  animate?: boolean;
  zoom?: boolean;
}

export const PlayGraph = (props: PlayGraphProps) => {
  const { plays, animate, zoom } = props;

  const options = useMemo(
    () => ({
      chart: {
        id: "line",
        zoom: {
          enabled: zoom
        },
        redrawOnParentResize: false,
        animations: {
          enabled: animate
        }
      },
      xaxis: {
        categories: plays.map(
          p => p.beforeState.inning.slice(-1) + "." + p.beforeState.outs
        )
      },
      markers: {
        size: 5,
        showNullDataPoints: false
      },
      stroke: { width: [7, 2, 5], dashArray: [0, 3, 0] },
      yaxis: {
        min: 0,
        max: 1000
      }
    }),
    [plays, animate, zoom]
  );

  const series = useMemo(
    () => [
      {
        name: "Pitch",
        type: "line",
        data: plays.map((play: Play) => play.pitch)
      },
      {
        name: "Swing",
        type: "line",
        data: plays.map((play: Play) => play.swing)
      },
      {
        name: "Delta",
        type: "column",
        data: plays.map((currentPlay: Play, index: number, plays: Play[]) => {
          if (
            index > 0 &&
            plays[index - 1] &&
            currentPlay.pitch &&
            currentPlay.swing
          ) {
            let delta = Math.abs(currentPlay.pitch - plays[index - 1].pitch);

            return delta > 500 ? 1000 - delta : delta;
          } else {
            return null;
          }
        })
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
