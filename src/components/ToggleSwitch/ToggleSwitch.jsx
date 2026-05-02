import { useContext } from "react";

import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTempatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__circle"></span>
      <span
        style={{ color: `${currentTemperatureUnit === "F" ? "#fff" : ""}` }}
        className="toggle-switch__text toggle-switch__text_f"
      >
        F
      </span>
      <span
        style={{ color: `${currentTemperatureUnit === "C" ? "#fff" : ""}` }}
        className="toggle-switch__text toggle-switch__text_c"
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;
