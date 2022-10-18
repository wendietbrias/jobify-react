import "./style.scss";
import { useState } from "react";
import { Alert } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
import { UpdateUserHandler } from "../../store/Auth";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: auth, loading } = useSelector((state) => state.auth);
  const decoded = auth ? decode(auth) : null;

  const [alert, setAlert] = useState({
    isOpen: false,
    message: "",
    variant: "",
  });
  const [formData, setFormData] = useState({
    name: decoded?.name || "",
    lastName: "Last Name",
    email: decoded?.email || "",
    location: decoded?.location || "My Location",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UpdateUserHandler({ formData, setAlert, id: decoded?._id }));
  };

  return (
    <section className="profile-container">
      <div className="profile-box">
        {alert?.isOpen && <Alert alert={alert} />}
        <h2>Profile</h2>
        <form onSubmit={submitHandler} className="profile-box__form">
          <div className="form-control">
            <label>Name</label>
            <input
              onChange={changeHandler}
              value={formData?.name}
              type="text"
              name="name"
            />
          </div>
          <div className="form-control">
            <label>Lastname</label>
            <input
              onChange={changeHandler}
              value={formData?.lastName}
              type="text"
              name="lastName"
            />
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              onChange={changeHandler}
              value={formData?.email}
              type="text"
              name="email"
            />
          </div>
          <div className="form-control">
            <label>My Location</label>
            <input
              onChange={changeHandler}
              value={formData?.location}
              type="text"
              name="location"
            />
          </div>
          <div className="button-grup">
            <button type="submit" className="save-btn">
              {loading ? "please wait.." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
