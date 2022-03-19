import "../styles/Button.css";

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="Button rounded-corners">
      {children || "No Text"}
    </button>
  );
};

export default Button;

//#6239bd
