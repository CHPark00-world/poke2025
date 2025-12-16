import "./statBar.css";
import STAT from "../constants/stat";

const StatBar = ({ statName, statValue, maxValue = 255 }) => {
  const percentage = (statValue / maxValue) * 100;
  const koreanName = STAT[statName];

  return (
    <div className="statBar">
      <span className="stat-name">{koreanName}</span>
      <span className="stat-value">{statValue}</span>
      <div className="bar-background">
        <div className="bar-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default StatBar;
