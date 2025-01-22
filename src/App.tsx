import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import ButtonContainer from "./components/ButtonContainer";
import PlayerSelection from "./components/PlayerSelection";
import ChoosePlayers from "./components/ChoosePlayers";
import AssignHeroes from "./components/AssignHeroes";
import EndGame from "./components/EndGame";
import ContinueSeason from "./components/ContinueSeason";
import Footer from "./components/Footer";
import { Season } from "./types";

const App: React.FC = () => {
  const [step, setStep] = useState<"home" | "playerSelection" | "choosePlayers" | "assignHeroes" | "endGame" | "continueSeason">(
    "home"
  );
  const [playersCount, setPlayersCount] = useState<number>(2);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [heroesAssigned, setHeroesAssigned] = useState<{ [player: string]: string }>({});
  const [unfinishedSeasons, setUnfinishedSeasons] = useState<Season[]>([]);
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  const [playerResults, setPlayerResults] = useState<{ [player: string]: number }>({});

  const heroPool = ["King Arthur", "Medusa", "Sherlock Holmes", "Sinbad", "Alice", "Robin Hood"];

  // Mock data for unfinished seasons
  useEffect(() => {
    const mockSeasons: Season[] = [
      { id: "1", name: "Season 1", players: ["Cosmin", "Razvan"], progress: "Game In Progress" },
      { id: "2", name: "Season 2", players: ["Calin", "Sorin", "Cosmin"], progress: "Game In Progress" },
    ];
    localStorage.setItem("unfinishedSeasons", JSON.stringify(mockSeasons));
    setUnfinishedSeasons(mockSeasons);
  }, []);

  useEffect(() => {
    const savedSeasons = localStorage.getItem("unfinishedSeasons");
    if (savedSeasons) {
      setUnfinishedSeasons(JSON.parse(savedSeasons));
    }
  }, []);

  const handleStartNewSeason = () => {
    setStep("playerSelection");
  };

  const handleContinueSeason = () => {
    setStep("continueSeason");
  };

  const handleHome = () => {
    setStep("home");
  };

  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayersCount(Number(e.target.value));
  };

  const handleConfirmPlayerCount = () => {
    setStep("choosePlayers");
    setSelectedPlayers([]);
  };

  const handlePlayerToggle = (player: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(player)
        ? prev.filter((p) => p !== player)
        : prev.length < playersCount
        ? [...prev, player]
        : prev
    );
  };

  const handleConfirmPlayers = () => {
    setStep("assignHeroes");
    setHeroesAssigned({});
  };

  const handleAssignHeroes = () => {
    const shuffledHeroes = [...heroPool].sort(() => Math.random() - 0.5);
    const assignedHeroes = selectedPlayers.reduce((acc, player, index) => {
      acc[player] = shuffledHeroes[index];
      return acc;
    }, {} as { [player: string]: string });
    setHeroesAssigned(assignedHeroes);
  };

  const handleStartGame = () => {
    const newSeason: Season = {
      id: Date.now().toString(),
      name: `Season ${unfinishedSeasons.length + 1}`,
      players: selectedPlayers,
      progress: "Game In Progress",
    };
    setUnfinishedSeasons((prev) => [...prev, newSeason]);
    setCurrentSeason(newSeason);
    localStorage.setItem("unfinishedSeasons", JSON.stringify([...unfinishedSeasons, newSeason]));
    setStep("endGame");
  };

  const handleAssignPlaces = (player: string, place: number) => {
    setPlayerResults((prev) => {
      const updatedResults = { ...prev };
      // Remove the place from any other player
      Object.keys(updatedResults).forEach((key) => {
        if (updatedResults[key] === place) {
          delete updatedResults[key];
        }
      });
      updatedResults[player] = place;
      return updatedResults;
    });
  };

  const handleEndGame = () => {
    if (!currentSeason) return;

    const updatedSeason: Season = {
      ...currentSeason,
      progress: "Game Completed",
      results: playerResults,
    };

    const updatedSeasons = unfinishedSeasons.map((season) =>
      season.id === currentSeason.id ? updatedSeason : season
    );
    setUnfinishedSeasons(updatedSeasons);
    localStorage.setItem("unfinishedSeasons", JSON.stringify(updatedSeasons));
    alert("Game completed! Results have been saved.");
    setStep("assignHeroes");
  };

  const handleSelectSeason = (season: Season) => {
    setCurrentSeason(season);
    setSelectedPlayers(season.players);
    setStep("assignHeroes");
  };

  return (
    <div className="app">
      <div className="main-content">
        {step === "home" ? (
          <>
            <Header />
            <ButtonContainer onStartNewSeason={handleStartNewSeason} onContinueSeason={handleContinueSeason} />
          </>
        ) : step === "playerSelection" ? (
          <PlayerSelection
            playersCount={playersCount}
            onPlayerCountChange={handlePlayerCountChange}
            onConfirmPlayerCount={handleConfirmPlayerCount}
            onHome={handleHome}
          />
        ) : step === "choosePlayers" ? (
          <ChoosePlayers
            selectedPlayers={selectedPlayers}
            playersCount={playersCount}
            onPlayerToggle={handlePlayerToggle}
            onConfirmPlayers={handleConfirmPlayers}
            onHome={handleHome}
          />
        ) : step === "assignHeroes" ? (
          <AssignHeroes
            selectedPlayers={selectedPlayers}
            heroesAssigned={heroesAssigned}
            onAssignHeroes={handleAssignHeroes}
            onStartGame={handleStartGame}
            onHome={handleHome}
          />
        ) : step === "endGame" ? (
          <EndGame
            selectedPlayers={selectedPlayers}
            playerResults={playerResults}
            playersCount={playersCount}
            onAssignPlaces={handleAssignPlaces}
            onEndGame={handleEndGame}
            onHome={handleHome}
          />
        ) : step === "continueSeason" ? (
          <ContinueSeason
            unfinishedSeasons={unfinishedSeasons}
            onSelectSeason={handleSelectSeason}
            onHome={handleHome}
          />
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default App;