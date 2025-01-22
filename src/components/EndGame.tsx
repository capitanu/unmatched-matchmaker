import React from "react";

interface EndGameProps {
  selectedPlayers: string[];
  playerResults: { [player: string]: number };
  playersCount: number;
  onAssignPlaces: (player: string, place: number) => void;
  onEndGame: () => void;
  onHome: () => void;
}

const EndGame: React.FC<EndGameProps> = ({
  selectedPlayers,
  playerResults,
  playersCount,
  onAssignPlaces,
  onEndGame,
  onHome,
}) => (
  <div className="end-game">
    <h2 className="subtitle">End Game</h2>
    <p>Assign finishing places to each player:</p>
    <div className="player-results">
      {selectedPlayers.map((player) => (
        <div key={player} className="player-result">
          <span>{player}</span>
          <select
            value={playerResults[player] || ""}
            onChange={(e) => onAssignPlaces(player, Number(e.target.value))}
          >
            <option value="" disabled>
              Select Place
            </option>
            {Array.from({ length: selectedPlayers.length }, (_, i) => i + 1).map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
    <button
      className="btn primary-btn"
      onClick={onEndGame}
      disabled={Object.keys(playerResults).length !== playersCount}
    >
      End Game
    </button>
    <button className="btn home-btn" onClick={onHome}>
      Home
    </button>
  </div>
);

export default EndGame;
