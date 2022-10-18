import "./style.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { JobCard, Loading } from "../../components";

const AllJobs = ({ setId }) => {
  const { jobs, loading } = useSelector((state) => state.jobs);
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    location: "",
    status: "",
    jobType: "",
  });

  const clearHandler = () => {
    setFormData({
      position: "",
      company: "",
      location: "",
      status: "",
      jobType: "",
    });
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="alljob-container">
      <div className="alljob-box">
        <h2>Search Form</h2>
        <form className="alljob-box__form">
          <div className="form-control">
            <label>Search</label>
            <input
              name="position"
              value={formData.position}
              onChange={changeHandler}
              type="text"
            />
          </div>
          <div className="form-control">
            <label>Status</label>
            <select
              name="company"
              value={formData.company}
              onChange={changeHandler}
              type="text"
            >
              <option value="pending">Pending</option>
              <option value="interviews">Interviews</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          <div className="form-control">
            <label>Type</label>
            <select
              name="location"
              value={formData.jobType}
              onChange={changeHandler}
              type="text"
            >
              <option value="part-time">Part-time</option>
              <option value="full-time">Full-time</option>
              <option value="remote">Remote</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div className="form-control">
            <label>Sort</label>
            <select
              name="status"
              value={formData.status}
              onChange={changeHandler}
            >
              <option value="pending">Pending</option>
              <option value="interviews">Interviews</option>
              <option value="declined">Declined</option>
            </select>
          </div>

          <div className="button-grup">
            <button onClick={clearHandler} type="button" className="clear">
              Clear Filters
            </button>
          </div>
        </form>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <main className="content-container">
          <h3>{jobs?.length} jobs found</h3>
          {Array.isArray(jobs) && jobs.length > 0 ? (
            <div className="content-container__items">
              {jobs?.map((job, idx) => (
                <JobCard job={job} setId={setId} key={idx} />
              ))}
            </div>
          ) : (
            <div className="content-container__nojob">
              <h1>No Jobs Display...</h1>
            </div>
          )}
        </main>
      )}
    </section>
  );
};

export default AllJobs;
