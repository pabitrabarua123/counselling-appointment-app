import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type Props = {
  seriesPie: number[];
};

export default function TherapyPieChart({ seriesPie } : Props) {

  const options: ApexOptions = {
    chart: {
      width: 320,
      type: 'pie',
    },
    labels: ['Couple', 'Individual'],
    colors: ["#229d89", "#d23584"],
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
      offsetX: -40,
      style: {
        colors: ["#f0f0f0", "#f9f9f9"],
        fontSize: "14px",
        fontWeight: "normal",
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
               Therapy Sessions
            </h3>
            <p className="mt-1 mb-2 text-gray-500 text-theme-sm dark:text-gray-400">
              Distribution of couple vs individual therapy sessions
            </p>
          </div>
        </div>
        <div className="relative ">
          <div className="max-h-[240px]" id="chartDarkStyle">
            { seriesPie.length === 0 ? (
            <div className="w-full h-[240px] animate-pulse">
              <div className="h-full w-full bg-gray-200 rounded-lg"></div>
            </div>
            ) : (
            <div className="w-full h-[240px]">
              <Chart
                options={options}
                series={seriesPie}
                width={350}
                type="pie"
              />
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
