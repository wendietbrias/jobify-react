import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  BsBriefcaseFill,
  BsCalendarWeekFill,
  BsCalendarDate,
} from "react-icons/bs";
import { DeleteJobSlice } from "../store/Jobs";
import { useDispatch } from "react-redux";

const JobCard = ({ job, setId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="job-card">
      <header className="job-card__header">
        <span className="header__avatar-job">{job?.company?.charAt(0)}</span>
        <div className="header__info">
          <h4>{job?.position}</h4>
          <p>{job?.company}</p>
        </div>
      </header>
      <div className="job-card__content">
        <article className="content__item">
          <FaLocationArrow />
          <p>{job?.location}</p>
        </article>
        <article className="content__item">
          <BsBriefcaseFill />
          <p>{job?.jobType}</p>
        </article>
        <article className="content__item">
          <BsCalendarWeekFill />
          <p>
            {job?.createdAt
              ? new Date(job?.createdAt).toDateString()
              : new Date().toDateString()}
          </p>
        </article>
        <article className="content__item">
          <span className={`item__job-status ${job?.status}`}>
            {job?.status}
          </span>
        </article>
      </div>
      <div className="button-action">
        <button
          onClick={() => {
            setId(job?._id);
            navigate("/add");
          }}
          className="edit-btn"
        >
          Edit
        </button>
        <button
          onClick={() => dispatch(DeleteJobSlice(job?._id))}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
