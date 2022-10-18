import "./style.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../../components";
import { GetAllSlice } from "../../store/Jobs";

const Main = () => {
  const dispatch = useDispatch();
  const { user: auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showAside, setShowAside] = useState(true);

  useEffect(() => {
    if (!auth) {
      return navigate("/landing");
    }

    dispatch(GetAllSlice());
  }, [auth]);

  return (
    <div className="main-container">
      <Sidebar showAside={showAside} />
      <main className={`main-container__content ${showAside ? "active" : ""}`}>
        <Navbar showAside={showAside} setShowAside={setShowAside} />
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
