import "../styles/Button.css";

const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`Button rounded-corners ${className}`}>
      {children || "No Text"}
    </button>
  );
};

export default Button;

//#6239bd
