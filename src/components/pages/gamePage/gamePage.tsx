import React, { useEffect, useState, useMemo } from "react";
import { useGetGameLog } from "../../../hooks/useGetGameLog/useGetGameLog";
import Select from "react-select";
import { useGetGames } from "../../../hooks/useGetGames/useGetGames";
import { Game } from "../../../interfaces/game";
import { PlayTable } from "../../playTable/playTable";
import { Play } from "../../../interfaces/play";
import { PlayGraph } from "../../playGraph/playGraph";
import {
  Container,
  Content,
  FlexboxGrid,
  Header,
  Loader,
  Nav,
  Toggle
} from "rsuite";
import { useLeagueToggleContext } from "../../../context/LeagueToggleContext/leagueToggleContext";
import { mlrTeamsMap, milrTeamsMap } from "../../../data/teamsMaps";
import { useGetActiveGame } from "../../../hooks/useGetActiveGame/useGetActiveGame";
import { Link } from "react-router-dom";

export const GamePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState(6);
  const [selectedSession, setSelectedSession] = useState(1);
  const [selectedGame, setSelectedGame] = useState<Game>();
  const [selectedActiveTeam, setSelectedActiveTeam] = useState<string>();
  const [selectedTeamsMap, setSelectedTeamsMap] = useState(mlrTeamsMap);

  const [gameLog, loadingGameLogs, , fetchGameLog] = useGetGameLog();
  const [games, loadingGames, , fetchGames] = useGetGames();
  const [activeGame, loadingActiveGame, , fetchActiveGame] = useGetActiveGame();

  const { currentLeague, setCurrentLeague } = useLeagueToggleContext();

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

      setSelectedActiveTeam(undefined);
    }
  }, [selectedGame, fetchGameLog]);

  useEffect(() => {
    if (selectedActiveTeam) {
      fetchActiveGame(selectedActiveTeam);

      setSelectedGame(undefined);
    }
  }, [selectedActiveTeam, fetchActiveGame]);

  useEffect(() => {
    if (activeGame) {
      fetchGameLog(activeGame.id);
    }
  }, [activeGame, fetchGameLog]);

  useEffect(() => {
    setSelectedGame(undefined);
    setSelectedActiveTeam(undefined);
    setSelectedTeamsMap(currentLeague === "milr" ? milrTeamsMap : mlrTeamsMap);
  }, [currentLeague]);

  const game = useMemo(() => {
    return selectedGame
      ? selectedGame
      : activeGame && selectedActiveTeam
      ? activeGame
      : undefined;
  }, [selectedGame, activeGame, selectedActiveTeam]);

  const getManOnState = () => {
    if (game?.firstOccupied && !game?.secondOccupied && !game?.thirdOccupied) {
      return ", Man on first";
    } else if (
      !game?.firstOccupied &&
      game?.secondOccupied &&
      !game?.thirdOccupied
    ) {
      return ", Man on second";
    } else if (
      !game?.firstOccupied &&
      !game?.secondOccupied &&
      game?.thirdOccupied
    ) {
      return ", Man on third";
    } else if (
      game?.firstOccupied &&
      game?.secondOccupied &&
      !game?.thirdOccupied
    ) {
      return ", Men on first and second";
    } else if (
      game?.firstOccupied &&
      !game?.secondOccupied &&
      game?.thirdOccupied
    ) {
      return ", Men on first and third";
    } else if (
      !game?.firstOccupied &&
      game?.secondOccupied &&
      game?.thirdOccupied
    ) {
      return ", Men of second and third";
    } else if (
      game?.firstOccupied &&
      game?.secondOccupied &&
      game?.thirdOccupied
    ) {
      return ", Bases loaded";
    }

    return "";
  };

  const getGameInfo = () => {
    let gameInfo = `${game?.awayScore} - ${game?.homeScore}`;
    if (!game?.completed) {
      gameInfo = `${gameInfo} | ${game?.inning} ${
        game?.outs
      } outs ${getManOnState()}`;
    }

    return gameInfo;
  };

  return (
    <Container style={{ height: "100%" }}>
      <Header>
        <FlexboxGrid justify="space-between" style={{ padding: 4 }}>
          <FlexboxGrid align="middle" justify="start" style={{ width: "50%" }}>
            <FlexboxGrid.Item>
              <Toggle
                size="md"
                checked={currentLeague === "milr"}
                onChange={(checked: boolean) => {
                  console.log("checked", checked);
                  setCurrentLeague(checked ? "milr" : "mlr");
                }}
                checkedChildren="MiLR"
                unCheckedChildren="MiLR"
              />
            </FlexboxGrid.Item>

            <FlexboxGrid.Item style={{ marginLeft: 8 }} colspan={8}>
              <Select
                value={{
                  label:
                    selectedActiveTeam && selectedTeamsMap[selectedActiveTeam]
                      ? selectedTeamsMap[selectedActiveTeam]
                      : "Select active game for...",
                  value: selectedActiveTeam ? selectedActiveTeam : ""
                }}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                menuPortalTarget={document.body}
                onChange={(team: any) => {
                  setSelectedActiveTeam(team.value);
                }}
                options={
                  Object.entries(selectedTeamsMap)
                    .sort()
                    .map(([tag, teamName]) => ({
                      label: teamName,
                      value: tag
                    })) as any
                }
              />
            </FlexboxGrid.Item>

            <FlexboxGrid.Item style={{ marginLeft: 16 }}>
              <Link to={`/${currentLeague}/player`}>
                {"Go to player page ➡️"}
              </Link>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <FlexboxGrid justify="end" style={{ width: "50%" }}>
            <FlexboxGrid.Item colspan={3} style={{ marginRight: 4 }}>
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

            <FlexboxGrid.Item colspan={3} style={{ marginRight: 4 }}>
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
        </FlexboxGrid>
      </Header>

      <Content style={{ height: "100%" }}>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{ height: "100%", width: "100%" }}
        >
          {loadingGameLogs || loadingActiveGame ? (
            <Loader size="lg" />
          ) : game && gameLog ? (
            <>
              <FlexboxGrid.Item style={{ width: "100%", textAlign: "center" }}>
                <h3>{`${game?.awayTeam.name} @ ${game?.homeTeam.name}`}</h3>
                <h5>{`${getGameInfo()}`}</h5>
              </FlexboxGrid.Item>

              <FlexboxGrid.Item style={{ width: "100%" }}>
                <Nav
                  appearance={"tabs"}
                  activeKey={selectedTab}
                  onSelect={(e: any) => {
                    setSelectedTab(e);
                  }}
                >
                  <Nav.Item eventKey={0}>{game.awayTeam.name}</Nav.Item>
                  <Nav.Item eventKey={1}>{game.homeTeam.name}</Nav.Item>
                </Nav>
              </FlexboxGrid.Item>

              <FlexboxGrid.Item style={{ height: "auto", width: "100%" }}>
                <PlayTable
                  plays={gameLog
                    .filter(
                      (p: Play) =>
                        p.beforeState.inning[0] ===
                        (selectedTab === 0 ? "B" : "T")
                    )
                    .reverse()}
                />
                <PlayGraph
                  plays={gameLog
                    .filter(
                      (p: Play) =>
                        p.beforeState.inning[0] ===
                        (selectedTab === 0 ? "B" : "T")
                    )
                    .reverse()}
                  animate={true}
                />
              </FlexboxGrid.Item>
            </>
          ) : (
            "Select a game"
          )}
        </FlexboxGrid>
      </Content>
    </Container>
  );
};
