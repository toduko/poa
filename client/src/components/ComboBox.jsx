import { useToggleState } from "../hooks";
import "../styles/ComboBox.css";

const ComboBox = ({ options, currentOption, setCurrentOption, children }) => {
  const [showOptions, toggleShowOptions] = useToggleState(false);

  return (
    <div className="ComboBox">
      {children}
      <button
        type="button"
        className="ComboBox-button"
        onClick={toggleShowOptions}
      >
        {currentOption}
      </button>
      {showOptions && (
        <div className="ComboBox-options">
          {options.map((option) => (
            <p
              className="ComboBox-option"
              key={option}
              value={option}
              onClick={() => {
                setCurrentOption(option);
                toggleShowOptions();
              }}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
