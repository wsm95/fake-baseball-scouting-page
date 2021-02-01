import { useEffect, useState } from "react";
import { useGetGameLog } from "../../../hooks/useGetGameLog/useGetGameLog";
import Select from "react-select";
import { useGetGames } from "../../../hooks/useGetGames/useGetGames";
import { Game } from "../../../interfaces/game";

export const GamePage: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState(6);
  const [selectedSession, setSelectedSession] = useState(1);
  const [selectedGame, setSelectedGame] = useState<Game>();

  const [gameLog, loadingGameLogs, , fetchGameLog] = useGetGameLog();
  const [games, loadingGames, , fetchGames] = useGetGames();

  useEffect(() => {
    const fetchGamesWrapper = async () => {
      await fetchGames(selectedSeason, selectedSession);
    };
    fetchGamesWrapper();

    setSelectedGame(undefined);
  }, [selectedSeason, selectedSession, fetchGames]);

  useEffect(() => {
    if (selectedGame) {
      fetchGameLog(selectedGame.id);
    }
  }, [selectedGame, fetchGameLog]);

  return (
    <div>
      <Select
        value={{ label: selectedSeason, value: selectedSeason }}
        onChange={(season: any) => {
          setSelectedSeason(season.value);
        }}
        options={[...Array(6).keys()]
          .map(x => ++x)
          .map(s => ({ label: s, value: s }))}
      />
      <Select
        value={{ label: selectedSession, value: selectedSession }}
        onChange={(season: any) => {
          setSelectedSession(season.value);
        }}
        options={[...Array(21).keys()]
          .map(x => ++x)
          .map(s => ({ label: s, value: s }))}
      />
      <Select
        isLoading={loadingGames}
        value={{
          label: selectedGame
            ? `${selectedGame.awayTeam.name} @ ${selectedGame.homeTeam.name}`
            : "Pick game",
          value: selectedGame
        }}
        onChange={(game: any) => {
          setSelectedGame(game.value);
        }}
        options={games?.map(g => ({
          label: `${g.awayTeam.name} @ ${g.homeTeam.name}`,
          value: g
        }))}
      />

      {loadingGameLogs ? (
        "Loading..."
      ) : selectedGame ? (
        <pre id="json">{JSON.stringify(gameLog, null, 2)}</pre>
      ) : (
        "Select a game"
      )}
    </div>
  );
};
