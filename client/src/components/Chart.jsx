import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

const ChartBar = () => {
  const { jobs } = useSelector((state) => state.jobs);

  if (!Array.isArray(jobs) || jobs.length < 1) return;

  return (
    <div className="chart-container">
      <Bar
        data={{
          labels: ["Pending", "Interviews", "Declined"],
          datasets: [
            {
              label: "Pending",
              data: [
                jobs?.filter((job) =>
                  job.status.toLowerCase() === "pending" ? job : ""
                ).length,
              ],
              backgroundColor: `rgb(233, 185, 73)`,
            },
            {
              label: "Interviews",
              data: [
                jobs?.filter((job) =>
                  job.status.toLowerCase() === "interviews" ? job : ""
                ).length,
              ],
              backgroundColor: "rgb(100, 122, 203)",
            },
            {
              label: "Declined",
              data: [
                jobs?.filter((job) =>
                  job.status.toLowerCase() === "declined" ? job : ""
                ).length,
              ],
              backgroundColor: "rgb(214, 106, 106)",
            },
          ],
        }}
      />
    </div>
  );
};

export default ChartBar;
