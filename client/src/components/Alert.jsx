const Alert = ({ alert }) => {
  return (
    <div className={`alert-container ${alert.variant}`}>
      <h5>{alert.message}</h5>
    </div>
  );
};

export default Alert;
