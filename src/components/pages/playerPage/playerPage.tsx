import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Select from "react-select";
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
import { useGetPlayerStats } from "../../../hooks/useGetPlayerStats/useGetPlayerStats";
import { useGetPlaysByPlayer } from "../../../hooks/useGetPlaysByPlayer/useGetPlaysByPlayer";
import { HeatMap } from "../../heatMap/heatMap";
import { PlayGraph } from "../../playGraph/playGraph";
import { PlayerStats } from "../../playerStats/playerStats";
import { PlayerSearchBar } from "../../playerSearchBar/playerSearchBar";

interface PlayerPageParams {
  playerId?: string;
  playType?: "pitching" | "batting";
}

export const PlayerPage: React.FC = () => {
  const { playerId, playType } = useParams<PlayerPageParams>();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState("6");

  const [player, loadingPlayer, , fetchPlayerStats] = useGetPlayerStats();
  const [plays, loadingPlays, , fetchPlaysByPlayer] = useGetPlaysByPlayer();

  const { currentLeague, setCurrentLeague } = useLeagueToggleContext();
  const history = useHistory();

  useEffect(() => {
    if (playerId && playType) {
      fetchPlayerStats(playerId);
      fetchPlaysByPlayer(playerId, playType);
    }
  }, [playerId, playType, fetchPlayerStats, fetchPlaysByPlayer]);

  const filteredPlays = useMemo(() => {
    if (plays) {
      if (selectedSeason === "All") {
        return plays;
      } else {
        return plays.filter(p => p.game.season.toString() === selectedSeason);
      }
    }

    return [];
  }, [plays, selectedSeason]);

  console.log(selectedSeason);
  console.log(filteredPlays);

  const setCurrentPlayer = (newPlayerId: string) => {
    history.replace(
      `/${currentLeague}/player/${newPlayerId}/${
        !playType ? "pitching" : playType
      }`
    );
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

            <FlexboxGrid.Item style={{ marginLeft: 8 }}>
              <Toggle
                size="md"
                checked={playType === "pitching" || !playType}
                onChange={(checked: boolean) => {
                  history.replace(
                    `/${currentLeague}/player/${playerId}/${
                      checked ? "pitching" : "batting"
                    }`
                  );
                }}
                checkedChildren="Pitching"
                unCheckedChildren="Batting"
              />
            </FlexboxGrid.Item>

            <FlexboxGrid.Item style={{ marginLeft: 12, width: 300 }}>
              <PlayerSearchBar setSelectedPlayer={setCurrentPlayer} />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <FlexboxGrid justify="end" align="middle" style={{ width: "50%" }}>
            Season:
            <FlexboxGrid.Item colspan={3} style={{ marginLeft: 4 }}>
              <Select
                value={{
                  label: selectedSeason,
                  value: selectedSeason
                }}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                menuPortalTarget={document.body}
                onChange={(season: any) => {
                  setSelectedSeason(season.value);
                }}
                options={["1", "2", "3", "4", "5", "6", "All"].map(s => ({
                  label: s,
                  value: s
                }))}
              />
            </FlexboxGrid.Item>
            <FlexboxGrid colspan={5} justify="end" style={{ marginLeft: 16 }}>
              <Link to={`/${currentLeague}/game`}>{"⬅️ Back to Games"}</Link>
            </FlexboxGrid>
          </FlexboxGrid>
        </FlexboxGrid>
      </Header>

      <Content style={{ height: "100%" }}>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{ height: "100%", width: "100%" }}
        >
          {playerId && playType ? (
            <>
              {loadingPlays || loadingPlayer ? (
                <Loader size="lg" />
              ) : (
                <>
                  {player && (
                    <PlayerStats player={player} statType={playType} />
                  )}
                  <FlexboxGrid style={{ width: "100%" }}>
                    <Nav
                      appearance={"tabs"}
                      activeKey={selectedTab}
                      onSelect={(e: any) => {
                        setSelectedTab(e);
                      }}
                    >
                      <Nav.Item eventKey={0}>Chart</Nav.Item>
                      <Nav.Item eventKey={1}>Heat map</Nav.Item>
                    </Nav>
                  </FlexboxGrid>

                  <FlexboxGrid.Item style={{ height: "100%", width: "100%" }}>
                    {filteredPlays.length > 0 ? (
                      selectedTab === 0 ? (
                        <PlayGraph plays={filteredPlays} zoom={true} />
                      ) : (
                        <HeatMap plays={filteredPlays} />
                      )
                    ) : (
                      <FlexboxGrid
                        justify="center"
                        align="middle"
                        style={{ height: "100%", width: "100%" }}
                      >
                        No plays available
                      </FlexboxGrid>
                    )}
                  </FlexboxGrid.Item>
                </>
              )}
            </>
          ) : (
            "Search for a player..."
          )}
        </FlexboxGrid>
      </Content>
    </Container>
  );
};
