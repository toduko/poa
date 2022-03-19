import "../styles/Button.css";

const Button = ({ children, onClick, className, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={`Button rounded-corners ${className || ""}`}
      disabled={disabled}
    >
      {children || "No Text"}
    </button>
  );
};

export default Button;
