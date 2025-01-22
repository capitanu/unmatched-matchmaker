import React from "react";

interface PlayerSelectionProps {
  playersCount: number;
  onPlayerCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPlayerCount: () => void;
  onHome: () => void;
}

const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  playersCount,
  onPlayerCountChange,
  onConfirmPlayerCount,
  onHome,
}) => (
  <div className="player-selection">
    <h2 className="subtitle">Select Number of Players</h2>
    <input
      type="number"
      min="2"
      max="4"
      value={playersCount}
      onChange={onPlayerCountChange}
      className="player-input"
    />
    <button className="btn primary-btn" onClick={onConfirmPlayerCount}>
      Confirm Player Count
    </button>
    <button className="btn home-btn" onClick={onHome}>
      Home
    </button>
  </div>
);

export default PlayerSelection;
