import "../styles/Button.css";

const Button = ({
  children,
  onClick,
  className,
  disabled = false,
  submit = false,
}) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`Button rounded-corners ${className || ""}`}
      disabled={disabled}
    >
      {children || "No Text"}
    </button>
  );
};

export default Button;
