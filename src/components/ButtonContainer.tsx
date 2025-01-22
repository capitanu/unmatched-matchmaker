import React from "react";

interface ButtonContainerProps {
  onStartNewSeason: () => void;
  onContinueSeason: () => void;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ onStartNewSeason, onContinueSeason }) => (
  <div className="button-container">
    <button className="btn primary-btn" onClick={onStartNewSeason}>
      Start New Season
    </button>
    <button className="btn secondary-btn" onClick={onContinueSeason}>
      Continue Season
    </button>
  </div>
);

export default ButtonContainer;
