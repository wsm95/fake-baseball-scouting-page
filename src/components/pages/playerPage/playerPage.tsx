import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Container,
  Content,
  FlexboxGrid,
  Header,
  Input,
  Loader,
  Nav,
  Toggle
} from "rsuite";
import { useLeagueToggleContext } from "../../../context/LeagueToggleContext/leagueToggleContext";
import { HeatMap } from "../../heatMap/heatMap";
import { PlayGraph } from "../../playGraph/playGraph";
import { useGetPlateAppearances } from "../../../hooks/useGetPlateAppearances/useGetPlateAppearances";

interface PlayerPageParams {
  playerId?: string;
  playType?: "pitching" | "batting";
}

export const PlayerPage: React.FC = () => {
  const { playerId, playType } = useParams<PlayerPageParams>();
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentPlayerId, setCurrentPlayerId] = useState(playerId ?? "");
  const [selectedSeason, setSelectedSeason] = useState("7");

  // const [player, loadingPlayer, , fetchPlayerStats] = useGetPlayerStats();
  const [
    plateAppearances,
    loadingPlateAppearances,
    ,
    fetchPlateAppearances
  ] = useGetPlateAppearances();

  const { currentLeague, setCurrentLeague } = useLeagueToggleContext();

  const history = useHistory();

  useEffect(() => {
    if (playerId && playType) {
      // fetchPlayerStats(playerId);
      fetchPlateAppearances(playerId, playType);
    }
  }, [playerId, playType, currentLeague, fetchPlateAppearances]);

  const filteredPlateAppearances = useMemo(() => {
    if (plateAppearances) {
      if (selectedSeason === "All") {
        return plateAppearances;
      } else {
        return plateAppearances.filter(
          p => p.season.toString() === selectedSeason
        );
      }
    }

    return [];
  }, [plateAppearances, selectedSeason]);

  console.log(selectedSeason);
  console.log(filteredPlateAppearances);

  const timeout = useRef<number>(-1);
  // const setCurrentPlayer = useCallback(
  //   (newPlayerId: string) => {

  //   },
  //   [setCurrentPlayerId]
  // );

  useEffect(() => {
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(async () => {
      history.replace(
        `/${currentLeague}/player/${
          !playType ? "pitching" : playType
        }/${currentPlayerId}`
      );
    }, 300);
  }, [history, currentPlayerId, currentLeague, playType]);

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
                    `/${currentLeague}/player/${
                      checked ? "pitching" : "batting"
                    }/${currentPlayerId}`
                  );
                }}
                checkedChildren="Pitching"
                unCheckedChildren="Batting"
              />
            </FlexboxGrid.Item>

            {/* <FlexboxGrid.Item style={{ marginLeft: 12, width: 300 }}>
              <PlayerSearchBar setSelectedPlayer={setCurrentPlayer} />
            </FlexboxGrid.Item> */}
          </FlexboxGrid>

          <FlexboxGrid justify="end" align="middle" style={{ width: "50%" }}>
            <FlexboxGrid.Item style={{ marginRight: 12, width: 150 }}>
              <Input
                value={currentPlayerId}
                onChange={setCurrentPlayerId}
                placeholder={playerId ?? "Enter Player Id"}
              />
            </FlexboxGrid.Item>
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
                options={["1", "2", "3", "4", "5", "6", "7", "All"].map(s => ({
                  label: s,
                  value: s
                }))}
              />
            </FlexboxGrid.Item>
            {/* <FlexboxGrid colspan={5} justify="end" style={{ marginLeft: 16 }}>
              <Link to={`/${currentLeague}/game`}>{"⬅️ Back to Games"}</Link>
            </FlexboxGrid> */}
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
              {loadingPlateAppearances ? (
                <Loader size="lg" />
              ) : (
                <>
                  {/* {player && (
                    <PlayerStats player={player} statType={playType} />
                  )} */}
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
                    {filteredPlateAppearances.length > 0 ? (
                      selectedTab === 0 ? (
                        <PlayGraph
                          plateAppearances={filteredPlateAppearances}
                          zoom={true}
                        />
                      ) : (
                        <HeatMap plateAppearances={filteredPlateAppearances} />
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
