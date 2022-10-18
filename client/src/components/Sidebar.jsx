import { IoIosStats } from "react-icons/io";
import { MdScreenSearchDesktop } from "react-icons/md";
import { VscNotebookTemplate } from "react-icons/vsc";
import { RiProfileLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ showAside }) => {
  const location = useLocation();

  return (
    <aside className={`main-container__aside ${showAside ? "active" : ""}`}>
      <header>
        <img src="logo.svg" alt="logo" />
      </header>
      <ul className="main-container__aside-links">
        <Link to="/">
          <li className="links__item">
            <IoIosStats
              className={`links__item-icon ${
                location.pathname === "/" ? "active" : ""
              }`}
            />
            <span>Stats</span>
          </li>
        </Link>
        <Link to="/all">
          <li className="links__item">
            <MdScreenSearchDesktop
              className={`links__item-icon ${
                location.pathname === "/all" ? "active" : ""
              }`}
            />
            <span>All Jobs</span>
          </li>
        </Link>
        <Link to="/add">
          <li className="links__item">
            <VscNotebookTemplate
              className={`links__item-icon ${
                location.pathname === "/add" ? "active" : ""
              }`}
            />
            <span>Add Jobs</span>
          </li>
        </Link>
        <Link to="/profile">
          <li className="links__item">
            <RiProfileLine
              className={`links__item-icon ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            />
            <span>Profile </span>
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
