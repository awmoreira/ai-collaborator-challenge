// Switch.tsx

import React, { useState } from "react";
import "./styles.css";

interface SwitchProps {
  onToggle: (isCelsius: boolean) => void;
  unit: string;
}

const Switch: React.FC<SwitchProps> = ({ onToggle, unit }) => {
  const [isCelsius, setIsCelsius] = useState(unit === "metric");

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
    onToggle(!isCelsius);
  };

  return (
    <div
      className={`switch-container ${isCelsius ? "celsius" : "fahrenheit"}`}
      onClick={handleToggle}
    >
      <div className="slider"></div>
      <div className="label-celsius">°C</div>
      <div className="label-fahrenheit">°F</div>
    </div>
  );
};

export default Switch;
