import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { PlateAppearance } from "../../interfaces/plateAppearance";

interface PlayGraphProps {
  plateAppearances: PlateAppearance[];
  animate?: boolean;
  zoom?: boolean;
}

export const PlayGraph = (props: PlayGraphProps) => {
  const { plateAppearances, animate, zoom } = props;

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
        categories: plateAppearances.map(p => p.inning + "." + p.outs)
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
    [plateAppearances, animate, zoom]
  );

  const series = useMemo(
    () => [
      {
        name: "Pitch",
        type: "line",
        data: plateAppearances.map(
          (plateAppearance: PlateAppearance) => plateAppearance.pitch
        )
      },
      {
        name: "Swing",
        type: "line",
        data: plateAppearances.map(
          (plateAppearance: PlateAppearance) => plateAppearance.swing
        )
      },
      {
        name: "Delta",
        type: "column",
        data: plateAppearances.map(
          (
            currentPlateAppearance: PlateAppearance,
            index: number,
            plateAppearances: PlateAppearance[]
          ) => {
            if (
              index > 0 &&
              plateAppearances[index - 1] &&
              currentPlateAppearance.pitch &&
              currentPlateAppearance.swing
            ) {
              let delta = Math.abs(
                currentPlateAppearance.pitch - plateAppearances[index - 1].pitch
              );

              return delta > 500 ? 1000 - delta : delta;
            } else {
              return null;
            }
          }
        )
      }
    ],
    [plateAppearances]
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
