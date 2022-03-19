import "../styles/Button.css";

const Button = ({ children }) => {
  return <button className="Button">{children || "No Text"}</button>;
};

export default Button;

//#6239bd
