import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, Nav } from "rsuite";
import { useGetPlayerStats } from "../../../hooks/useGetPlayerStats/useGetPlayerStats";
import { useGetPlaysByPlayer } from "../../../hooks/useGetPlaysByPlayer/useGetPlaysByPlayer";
import { HeatMap } from "../../heatMap/heatMap";
import { LineGraph } from "../../lineGraph/lineGraph";

interface PlayerPageParams {
  playerId: string;
}

export const PlayerPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [player, , , fetchPlayerStats] = useGetPlayerStats();
  const [plays, loadingPlays, , fetchPlaysByPlayer] = useGetPlaysByPlayer();
  const { playerId } = useParams<PlayerPageParams>();

  useEffect(() => {
    if (playerId) {
      fetchPlayerStats(playerId);
      fetchPlaysByPlayer(playerId, "pitching");
    }
  }, [playerId, fetchPlayerStats, fetchPlaysByPlayer]);

  if (loadingPlays) {
    return <Loader size="lg" />;
  }

  return (
    <>
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
      {plays ? (
        selectedTab === 0 ? (
          <LineGraph plays={plays} />
        ) : (
          <HeatMap plays={plays} />
        )
      ) : (
        "No plays available"
      )}
    </>
  );
};
