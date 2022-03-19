import { useRef, useEffect, useState } from "react";
import Color from "./Color";

const ColorPicker = ({ setColor }) => {
  const colors = [
    "#fac89e",
    "#e3e891",
    "#c2fc99",
    "#a3fcb3",
    "#92e8d5",
    "#96c8f2",
    "#ada8ff",
    "#ce94f7",
    "#ed94dd",
    "#fea8bb",
    "white",
    "black",
  ];
  return colors.map((color) => (
    <Color key={color} color={color} setColor={setColor} />
  ));
};

export default ColorPicker;
