import "./style.scss";
import { FaSuitcaseRolling } from "react-icons/fa";
import { BsCalendarFill } from "react-icons/bs";
import { AiFillBug } from "react-icons/ai";
import { useSelector } from "react-redux";
import { ChartBar } from "../../components";

function getStatistic(type, jobs = []) {
  const filteredItem = jobs.filter((item) =>
    item.status === type ? item : ""
  );
  return filteredItem.length;
}

const Stats = () => {
  const { jobs } = useSelector((state) => state.jobs);

  return (
    <section className="stats-container">
      <div className="stats-container__stats-count">
        <div className="stats-count pending">
          <header className="stats-count__count-item">
            <h1>{getStatistic("pending", jobs)}</h1>
            <span className="count-item__icon-container">
              <FaSuitcaseRolling style={{ fontSize: "1.5em" }} />
            </span>
          </header>
          <h2>Pending</h2>
        </div>
        <div className="stats-count interviews">
          <header className="stats-count__count-item">
            <h1>{getStatistic("interviews", jobs)}</h1>

            <span className="count-item__icon-container">
              <BsCalendarFill style={{ fontSize: "1.5em" }} />
            </span>
          </header>
          <h2>Interviews</h2>
        </div>
        <div className="stats-count declined">
          <header className="stats-count__count-item">
            <h1>{getStatistic("declined", jobs)}</h1>

            <span className="count-item__icon-container">
              <AiFillBug style={{ fontSize: "1.5em" }} />
            </span>
          </header>
          <h2>Declined</h2>
        </div>
      </div>
      <ChartBar />
    </section>
  );
};

export default Stats;
