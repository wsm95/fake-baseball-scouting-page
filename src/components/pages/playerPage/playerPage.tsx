import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import { LineGraph } from "../../lineGraph/lineGraph";

interface PlayerPageParams {
  playerId: string;
  playType: "pitching" | "batting";
}

export const PlayerPage: React.FC = () => {
  const { playerId, playType } = useParams<PlayerPageParams>();
  const [selectedTab, setSelectedTab] = useState(0);
  // const [currentPlayType, setCurrentPlayType] = useState<
  //   "pitching" | "batting"
  // >(playType);

  const [, , , fetchPlayerStats] = useGetPlayerStats();
  const [plays, loadingPlays, , fetchPlaysByPlayer] = useGetPlaysByPlayer();

  const { currentLeague, setCurrentLeague } = useLeagueToggleContext();
  const history = useHistory();

  useEffect(() => {
    if (playerId) {
      fetchPlayerStats(playerId);
      fetchPlaysByPlayer(playerId, playType);
    }
  }, [playerId, playType, fetchPlayerStats, fetchPlaysByPlayer]);

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
                checked={playType === "pitching"}
                onChange={(checked: boolean) => {
                  history.replace(
                    `/player/${playerId}/${checked ? "pitching" : "batting"}`
                  );
                }}
                checkedChildren="Pitching"
                unCheckedChildren="Batting"
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
          {loadingPlays ? (
            <Loader size="lg" />
          ) : (
            <>
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
                {plays ? (
                  selectedTab === 0 ? (
                    <LineGraph plays={plays} />
                  ) : (
                    <HeatMap plays={plays} />
                  )
                ) : (
                  "No plays available"
                )}
              </FlexboxGrid.Item>
            </>
          )}
        </FlexboxGrid>
      </Content>
    </Container>
  );
};
