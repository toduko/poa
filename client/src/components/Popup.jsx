import "../styles/Popup.css";

const Popup = ({ show, children }) => {
  return <div className="Popup">{show ? children : ""}</div>;
};

export default Popup;
