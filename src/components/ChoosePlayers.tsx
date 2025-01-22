import React from "react";

interface ChoosePlayersProps {
  selectedPlayers: string[];
  playersCount: number;
  onPlayerToggle: (player: string) => void;
  onConfirmPlayers: () => void;
  onHome: () => void;
}

const ChoosePlayers: React.FC<ChoosePlayersProps> = ({
  selectedPlayers,
  playersCount,
  onPlayerToggle,
  onConfirmPlayers,
  onHome,
}) => (
  <div className="choose-players">
    <h2 className="subtitle">Choose Players</h2>
    <div className="player-list">
      {["Cosmin", "Calin", "Razvan", "Sorin"].map((player) => (
        <label
          key={player}
          className={`player-option ${selectedPlayers.includes(player) ? "selected" : ""}`}
        >
          <input
            type="checkbox"
            checked={selectedPlayers.includes(player)}
            onChange={() => onPlayerToggle(player)}
            disabled={!selectedPlayers.includes(player) && selectedPlayers.length >= playersCount}
          />
          {player}
        </label>
      ))}
    </div>
    <button
      className="btn primary-btn"
      onClick={onConfirmPlayers}
      disabled={selectedPlayers.length !== playersCount}
    >
      Confirm Players
    </button>
    <button className="btn home-btn" onClick={onHome}>
      Home
    </button>
  </div>
);

export default ChoosePlayers;
