import React from "react";

interface AssignHeroesProps {
  selectedPlayers: string[];
  heroesAssigned: { [player: string]: string };
  onAssignHeroes: () => void;
  onStartGame: () => void;
  onHome: () => void;
}

const AssignHeroes: React.FC<AssignHeroesProps> = ({
  selectedPlayers,
  heroesAssigned,
  onAssignHeroes,
  onStartGame,
  onHome,
}) => (
  <div className="assign-heroes">
    <h2 className="subtitle">Assign Heroes</h2>
    <div className="hero-assignment">
      {Object.keys(heroesAssigned).length > 0 ? (
        <ul className="hero-list">
          {selectedPlayers.map((player) => (
            <li key={player} className="hero-item">
              {player} - {heroesAssigned[player]}
            </li>
          ))}
        </ul>
      ) : (
        <p>No heroes assigned yet. Click the button below to assign them!</p>
      )}
    </div>
    <button className="btn primary-btn" onClick={onAssignHeroes}>
      Randomly Assign Heroes
    </button>
    <button
      className="btn secondary-btn"
      onClick={onStartGame}
      disabled={Object.keys(heroesAssigned).length !== selectedPlayers.length}
    >
      Start Game
    </button>
    <button className="btn home-btn" onClick={onHome}>
      Home
    </button>
  </div>
);

export default AssignHeroes;
