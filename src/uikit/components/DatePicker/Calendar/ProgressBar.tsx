import { type FC } from "react";

type ProgressBarProps = {
  label: string;
  fact: number;
  norm: number;
};

export const ProgressBar: FC<ProgressBarProps> = ({ label, fact, norm }) => {
  const loadFactor = norm > 0 ? fact / norm : 0;
  const percent = Math.min(loadFactor * 100, 100);

  let colorClass = "no-norm"; 
  if (norm > 0) {
    if (loadFactor < 0.9) colorClass = "low";
    else if (loadFactor >= 0.9 && loadFactor < 1) colorClass = "medium";
    else if (loadFactor >= 1 && loadFactor < 1.1) colorClass = "high";
    else colorClass = "very-high"; 
  }

  return (
    <div className="progress-section">
      <h4>{label}</h4>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${colorClass}`} 
          style={{ width: `${percent}%` }} 
        />
      </div>
      <span className="progress-text">
        {fact.toFixed(2)}м-Текущая / {norm}м-Дневная норма
      </span>
    </div>
  );
};