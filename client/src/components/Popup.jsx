import "../styles/Popup.css";

const Popup = ({ show, children }) => {
  return <>{show ? <div className="Popup">{children}</div> : ""}</>;
};

export default Popup;
