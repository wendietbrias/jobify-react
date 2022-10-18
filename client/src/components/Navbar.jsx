import { RiMenu2Line } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Logout } from "../store/Auth";

const Navbar = ({ showAside, setShowAside }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const decoded = user ? decode(user) : null;
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navigation-bar">
      <button onClick={() => setShowAside(!showAside)} id="burger-menu">
        <RiMenu2Line />
      </button>
      <h2>Dashboard</h2>
      <div className="side-nav-bar">
        <button onClick={() => setShowDropdown(!showDropdown)} id="user-info">
          <FaUserCircle style={{ marginRight: "6px" }} />
          {decoded?.name}
        </button>
        <button
          onClick={() => dispatch(Logout())}
          style={{ display: `${showDropdown ? "block" : "none"}` }}
          id="logout-button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
