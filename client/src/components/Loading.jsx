import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="loading-container">
      <ReactLoading type="spin" width={140} height={140} color="#38bec9" />
    </div>
  );
};

export default Loading;
