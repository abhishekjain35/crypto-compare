import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const BarChart = ({ labels, values }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "USD",
        data: values.USD,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }
    ],
  };

  return (
    <div className="bar-container">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
