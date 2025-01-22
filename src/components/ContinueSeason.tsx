import React from "react";
import { Season } from "../types";

interface ContinueSeasonProps {
  unfinishedSeasons: Season[];
  onSelectSeason: (season: Season) => void;
  onHome: () => void;
}

const ContinueSeason: React.FC<ContinueSeasonProps> = ({
  unfinishedSeasons,
  onSelectSeason,
  onHome,
}) => (
  <div className="continue-season">
    <h2 className="subtitle">Continue a Season</h2>
    <ul className="season-list">
      {unfinishedSeasons.map((season) => (
        <li key={season.id} className="season-item">
          <span>{season.name} - {season.progress}</span>
          <button className="btn secondary-btn" onClick={() => onSelectSeason(season)}>
            Continue
          </button>
        </li>
      ))}
    </ul>
    <button className="btn home-btn" onClick={onHome}>
      Home
    </button>
  </div>
);

export default ContinueSeason;
