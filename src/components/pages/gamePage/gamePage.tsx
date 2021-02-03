import { useEffect, useState } from "react";
import { useGetGameLog } from "../../../hooks/useGetGameLog/useGetGameLog";
import Select from "react-select";
import { useGetGames } from "../../../hooks/useGetGames/useGetGames";
import { Game } from "../../../interfaces/game";
import { PlayTable } from "../../playTable/playTable";
import { Play } from "../../../interfaces/play";
import { LineGraph } from "../../lineGraph/lineGraph";
import { Container, Content, FlexboxGrid, Header, Loader, Nav } from "rsuite";

export const GamePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
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
    <Container style={{ height: "100%" }}>
      <Header>
        <FlexboxGrid justify="end">
          <FlexboxGrid.Item colspan={3}>
            <Select
              value={{ label: selectedSeason, value: selectedSeason }}
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={document.body}
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
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={document.body}
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
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={document.body}
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

      <Content style={{ height: "100%" }}>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{ height: "100%", width: "100%", flexDirection: "column" }}
        >
          {loadingGameLogs ? (
            <Loader size="lg" />
          ) : selectedGame && gameLog ? (
            <FlexboxGrid.Item style={{ width: "100%", height: "100%" }}>
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

              <FlexboxGrid.Item style={{ height: "auto" }}>
                <PlayTable
                  plays={gameLog
                    .filter(
                      (p: Play) =>
                        p.beforeState.inning[0] ===
                        (selectedTab === 0 ? "B" : "T")
                    )
                    .reverse()}
                />
                <LineGraph
                  plays={gameLog
                    .filter(
                      (p: Play) =>
                        p.beforeState.inning[0] ===
                        (selectedTab === 0 ? "B" : "T")
                    )
                    .reverse()}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid.Item>
          ) : (
            "Select a game"
          )}
        </FlexboxGrid>
      </Content>
    </Container>
  );
};
