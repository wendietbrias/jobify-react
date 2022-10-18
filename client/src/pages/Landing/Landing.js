import "./style.scss";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing-container">
      <nav className="landing-container__nav">
        <Link to="/landing">
          <img src="logo.svg" alt="logo" />
        </Link>
      </nav>
      <div className="landing-container__banner">
        <div className="banner__text">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link to="/auth">
            <button>Login / Register</button>
          </Link>
        </div>
        <img className="banner__img" src="illus.svg" alt="illustration" />
      </div>
    </section>
  );
};

export default Landing;
