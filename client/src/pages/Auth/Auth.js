import "./style.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignInHandler, SignUpHandler } from "../../store/Auth";
import { Alert } from "../../components";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const { user: auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    message: "",
    variant: "",
    isOpen: false,
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      return dispatch(SignUpHandler({ formData, setAlert }));
    }
    dispatch(SignInHandler({ formData, setAlert }));
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  return (
    <section className="auth-container">
      <div className="auth-container__form-container">
        {alert.isOpen && <Alert alert={alert} />}
        <img className="logo" src="logo.svg" alt="logo" />
        <h3>{isSignUp ? "Register" : "Login"}</h3>
        <form onSubmit={handleSubmit} className="form-container__form">
          {isSignUp ? (
            <div className="form-control">
              <label>Name</label>
              <input
                onChange={handleChange}
                name="name"
                value={formData.name}
                type="text"
              />
            </div>
          ) : null}
          <div className="form-control">
            <label>Email</label>
            <input
              onChange={handleChange}
              name="email"
              value={formData.email}
              type="email"
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              onChange={handleChange}
              name="password"
              value={formData.password}
              type="password"
            />
          </div>
          <button className="form__btn">
            {isSignUp ? "Register" : "Login"}
          </button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="form-container__switch"
        >
          {isSignUp
            ? " Already have account ? Login"
            : "Don't have account? Register"}
        </button>
      </div>
    </section>
  );
};

export default Auth;
