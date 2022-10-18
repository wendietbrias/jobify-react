import "./style.scss";
import { useState } from "react";
import { CreateJobSlice, UpdateJobSlice } from "../../store/Jobs";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "../../components";
import { useEffect } from "react";

const AddJob = ({ id, setId }) => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);
  const [alert, setAlert] = useState({
    isOpen: false,
    message: "",
    variant: "",
  });
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    location: "",
    status: "",
    jobType: "",
  });

  const submitHandler = () => {
    if (!id) {
      dispatch(CreateJobSlice({ formData, setAlert }));
    } else {
      dispatch(UpdateJobSlice({ id, formData, setAlert }));
    }

    setId(null);
    clearHandler();
  };

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

  useEffect(() => {
    if (id) {
      const findJob = jobs?.find((job) => job._id === id);
      setFormData({
        position: findJob?.position,
        company: findJob?.company,
        location: findJob?.location,
        status: findJob?.status,
        jobType: findJob?.jobType,
      });
    }
  }, [id]);

  return (
    <section className="addjob-container">
      <div className="addjob-box">
        {alert.isOpen && <Alert alert={alert} />}
        <h2>Add Job</h2>
        <form className="addjob-box__form">
          <div className="form-control">
            <label>Position</label>
            <input
              name="position"
              value={formData.position}
              onChange={changeHandler}
              type="text"
            />
          </div>
          <div className="form-control">
            <label>Company</label>
            <input
              name="company"
              value={formData.company}
              onChange={changeHandler}
              type="text"
            />
          </div>
          <div className="form-control">
            <label>Job Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={changeHandler}
              type="text"
            />
          </div>
          <div className="form-control">
            <label>Status</label>
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
          <div className="form-control">
            <label>Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={changeHandler}
            >
              <option value="full-time">Part-Time</option>
              <option value="part-time">Full-Time</option>
              <option value="remote">Remote</option>
              <option value="intership">Intership</option>
            </select>
          </div>
          <div className="button-grup">
            <button onClick={submitHandler} type="button" className="submit">
              {id ? "Update" : "Submit"}
            </button>
            <button onClick={clearHandler} type="button" className="clear">
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddJob;
