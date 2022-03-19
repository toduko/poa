import "../styles/Color.css";

const Color = ({ setColor, color, isActive }) => {
  const handleClick = () => {
    setColor(color);
  };

  return (
    <button
      className={`Color-button ${isActive && "Color-button-active"}`}
      onClick={handleClick}
      style={{ backgroundColor: color }}
    />
  );
};

export default Color;
