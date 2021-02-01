import { useEffect, useState } from "react";
import { useGetGameLog } from "../../../hooks/useGetGameLog/useGetGameLog";
import Select from "react-select";
import { useGetGames } from "../../../hooks/useGetGames/useGetGames";
import { Game } from "../../../interfaces/game";
import { PlayTable } from "../../playTable/playTable";
import { Play } from "../../../interfaces/play";
import { LineGraph } from "../../lineGraph/lineGraph";
import { Container, Content, FlexboxGrid, Header, Nav } from "rsuite";

export const GamePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  console.log(selectedTab);
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
      <Container>
        <Header>
          <FlexboxGrid justify="end">
            <FlexboxGrid.Item colspan={3}>
              <Select
                value={{ label: selectedSeason, value: selectedSeason }}
                onChange={(season: any) => {
                  setSelectedSeason(season.value);
                }}
                options={[...Array(6).keys()]
                  .map(x => ++x)
                  .map(s => ({ label: s, value: s }))}
              />
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={3}>
              <Select
                value={{ label: selectedSession, value: selectedSession }}
                onChange={(season: any) => {
                  setSelectedSession(season.value);
                }}
                options={[...Array(21).keys()]
                  .map(x => ++x)
                  .map(s => ({ label: s, value: s }))}
              />
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={6}>
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
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>

        <Content></Content>
      </Container>

      {loadingGameLogs ? (
        "Loading..."
      ) : selectedGame && gameLog ? (
        <>
          <Nav
            appearance={"tabs"}
            activeKey={selectedTab}
            onSelect={(e: any) => {
              setSelectedTab(e);
            }}
          >
            <Nav.Item eventKey={0}>{selectedGame.awayTeam.name}</Nav.Item>
            <Nav.Item eventKey={1}>{selectedGame.homeTeam.name}</Nav.Item>
          </Nav>

          {selectedTab === 0 ? (
            <>
              <PlayTable
                plays={gameLog
                  .filter((p: Play) => p.beforeState.inning[0] === `B`)
                  .reverse()}
              />
              <LineGraph
                plays={gameLog
                  .filter((p: Play) => p.beforeState.inning[0] === `B`)
                  .reverse()}
              />
            </>
          ) : (
            <>
              <PlayTable
                plays={gameLog
                  .filter((p: Play) => p.beforeState.inning[0] === `T`)
                  .reverse()}
              />
              <LineGraph
                plays={gameLog
                  .filter((p: Play) => p.beforeState.inning[0] === `T`)
                  .reverse()}
              />
            </>
          )}
        </>
      ) : (
        "Select a game"
      )}
    </div>
  );
};
