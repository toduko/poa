import Color from "./Color";
import "../styles/ColorPicker.css";

const ColorPicker = ({ setColor, activeColor }) => {
  const colors = [
    "black",
    "#FFFFFF",
    "#9400D3",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#FF7F00",
    "#FF0000",
  ];
  return (
    <ul className="ColorPicker">
      {colors.map((color) => (
        <Color
          key={color}
          color={color}
          setColor={setColor}
          isActive={activeColor == color}
        />
      ))}
    </ul>
  );
};

export default ColorPicker;
