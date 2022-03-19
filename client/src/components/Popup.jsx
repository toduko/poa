import "../styles/Popup.css";

const Popup = ({ show, children }) => {
  const className = show ? "" : "-hidden";
  return (
    <>
      <div className={`blurred-dark-background${className}`} />
      <div className={`Popup${className} rounded-corners`}>{children}</div>
    </>
  );
};

export default Popup;
