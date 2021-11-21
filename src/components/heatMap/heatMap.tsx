import { useMemo } from "react";
import { Play } from "../../interfaces/play";
import ReactApexChart from "react-apexcharts";
import { PlateAppearance } from "../../interfaces/plateAppearance";

interface HeatMapProps {
  plateAppearances: PlateAppearance[];
}

export const HeatMap = (props: HeatMapProps) => {
  const { plateAppearances } = props;

  const series = useMemo(
    () => [
      {
        name: "0-100",
        data: [
          {
            x: "0-25",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 0 && p.pitch < 26 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "26-50",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 25 && p.pitch < 51 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "51-75",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 50 && p.pitch < 76 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "75-100",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 75 && p.pitch < 101 && a.push(p.pitch), a
              ),
              []
            ).length
          }
        ]
      },
      {
        name: "100-200",
        data: [
          {
            x: "100-125",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 100 && p.pitch < 126 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "126-150",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 125 && p.pitch < 151 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "151-175",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 150 && p.pitch < 176 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "175-200",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 175 && p.pitch < 201 && a.push(p.pitch), a
              ),
              []
            ).length
          }
        ]
      },
      {
        name: "200-300",
        data: [
          {
            x: "200-225",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 200 && p.pitch < 226 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "226-250",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 225 && p.pitch < 251 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "252-275",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 250 && p.pitch < 276 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "275-300",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 275 && p.pitch < 301 && a.push(p.pitch), a
              ),
              []
            ).length
          }
        ]
      },
      {
        name: "300-400",
        data: [
          {
            x: "300-325",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 300 && p.pitch < 326 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "326-350",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 325 && p.pitch < 351 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "351-375",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 350 && p.pitch < 376 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "375-400",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 375 && p.pitch < 401 && a.push(p.pitch), a
              ),
              []
            ).length
          }
        ]
      },
      {
        name: "400-500",
        data: [
          {
            x: "400-425",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 400 && p.pitch < 426 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "426-450",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 425 && p.pitch < 451 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "451-475",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 450 && p.pitch < 476 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "475-500",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 475 && p.pitch < 501 && a.push(p.pitch), a
              ),
              []
            ).length
          }
        ]
      },
      {
        name: "500-600",
        data: [
          {
            x: "500-525",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 500 && p.pitch < 526 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "526-550",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 525 && p.pitch < 551 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "551-575",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 550 && p.pitch < 576 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "575-600",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 575 && p.pitch < 601 && a.push(p.pitch), a
              ),
              []
            ).length
          }
        ]
      },
      {
        name: "600-700",
        data: [
          {
            x: "600-625",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 600 && p.pitch < 626 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "626-650",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 625 && p.pitch < 651 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "651-675",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 650 && p.pitch < 676 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "675-700",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 675 && p.pitch < 701 && a.push(p.pitch), a
              ),
              []
            ).length
          }
        ]
      },
      {
        name: "700-800",
        data: [
          {
            x: "700-725",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 700 && p.pitch < 726 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "726-750",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 725 && p.pitch < 751 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "751-775",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 750 && p.pitch < 776 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "775-800",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 775 && p.pitch < 801 && a.push(p.pitch), a
              ),
              []
            ).length
          }
        ]
      },
      {
        name: "800-9000",
        data: [
          {
            x: "800-825",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 800 && p.pitch < 826 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "826-850",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 825 && p.pitch < 851 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "851-875",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 850 && p.pitch < 876 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "875-900",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 875 && p.pitch < 901 && a.push(p.pitch), a
              ),
              []
            ).length
          }
        ]
      },

      {
        name: "900-1000",
        data: [
          {
            x: "900-925",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 900 && p.pitch < 926 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "926-950",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 925 && p.pitch < 951 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "951-975",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 950 && p.pitch < 976 && a.push(p.pitch), a
              ),
              []
            ).length
          },
          {
            x: "975-1000",
            y: plateAppearances.reduce(
              (a: number[], p) => (
                p.pitch > 975 && p.pitch < 1001 && a.push(p.pitch), a
              ),
              []
            ).length
          }
        ]
      }
    ],
    [plateAppearances]
  );

  const options = useMemo(
    () => ({
      chart: {
        height: 600,
        type: "heatmap",
        zoom: {
          enabled: false
        },
        animations: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"]
    }),
    []
  );

  return (
    <div>
      <ReactApexChart
        series={series}
        options={options}
        type="heatmap"
        height={600}
      />
    </div>
  );
};
