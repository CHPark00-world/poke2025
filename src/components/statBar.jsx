import "./statBar.css";
import STAT from "../constants/stat";

const StatBar = ({ statName, statValue, maxValue = 255 }) => {
  const percentage = (statValue / maxValue) * 100;
  const koreanName = STAT[statName];

  return (
    <div className="statbar">
      <span className="stat_name">{koreanName}</span>
      <span className="stat_value">{statValue}</span>
      <div className="bar_background">
        <div className="bar_fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default StatBar;
